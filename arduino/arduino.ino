#include <HX711.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "secrets.h"
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>

#define AWS_IOT_PUBLISH_TOPIC  "topic/a" 
#define AWS_IOT_SUBSCRIBE_TOPIC "topic/last/c"

WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);


const int LOADCELL_DOUT_PIN = 26;
const int LOADCELL_SCK_PIN = 27;
const int button1 = 34; 
const int button2 = 35;

HX711 scale;
unsigned int calib = 369;

LiquidCrystal_I2C lcd1(0x27, 16, 2); 
LiquidCrystal_I2C lcd2(0x26, 16, 2);

bool countdownActive = false; 
bool nextindex=false;


int dose = 0;
int waterTemperature = 0;
float* waterQuantity;
int* pouringTimes;
int* extractionTime;
String waterQuantitySTR;
String pouringTimeSTR;
String extractionTimeSTR;

int pour_index = 0;
unsigned long previousMillis = 0;
const long interval = 1000; 
int stopwatchtime=0;
float tareweight=0.0;
float weight;
bool ready=false;
bool updateDisplay = false;
bool status=false;
int pour_size=0;

void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }


  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  client.begin(AWS_IOT_ENDPOINT, 8883, net);
  client.onMessage(messageHandler);

  Serial.print("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }

  if(!client.connected()){
    Serial.println("AWS IoT Timeout!");
    return;
  }

  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

void publishMessage()
{
  StaticJsonDocument<200> doc;
  doc["time"] = millis();
  doc["sensor_a0"] = analogRead(0);
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); 

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void messageHandler(String &topic, String &payload) {
  Serial.println("incoming: " + topic + " - " + payload);
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, payload);
  lcd2.setCursor(0, 0); 
  lcd2.print("READY                ");

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  dose = doc["Dose"];
  waterTemperature = doc["Water_temperature"];

  String waterQuantitySTR = doc["Water_quantity"].as<String>();
  String pouringTimeSTR = doc["Pouring_time"].as<String>();
  String extractionTimeSTR = doc["Extraction_time"].as<String>();

  char Water_quantity_temp[100]; 
  waterQuantitySTR.toCharArray(Water_quantity_temp, 100);
  char* Water_quantity_ptr = strtok(Water_quantity_temp, ", ");
  int waterQuantitySize =0;
  waterQuantity = (float*)malloc(10 * sizeof(float));
  while (Water_quantity_ptr != NULL && waterQuantitySize < 10) {
    waterQuantity[waterQuantitySize++] = atoi(Water_quantity_ptr);
    Water_quantity_ptr = strtok(NULL, ", ");
  }

  char Pouring_time_temp[100];
  pouringTimeSTR.toCharArray(Pouring_time_temp, 100);
  char* Pouring_time_ptr = strtok(Pouring_time_temp, ", ");
  int Pouring_time_size =0;
  pouringTimes = (int*)malloc(10 * sizeof(int));
  while (Pouring_time_ptr != NULL && Pouring_time_size < 10) {
    pouringTimes[Pouring_time_size++] = atoi(Pouring_time_ptr);
    Pouring_time_ptr = strtok(NULL, ", ");
  }
  pour_size=Pouring_time_size;

  char Extraction_time_temp[100]; 
  extractionTimeSTR.toCharArray(Extraction_time_temp, 100);
  char* Extraction_time_ptr = strtok(Extraction_time_temp, ", ");
  int Extraction_time_size =0;
  extractionTime = (int*)malloc(10 * sizeof(int));
  while (Extraction_time_ptr != NULL && Extraction_time_size < 10) {
    extractionTime[Extraction_time_size++] = atoi(Extraction_time_ptr);
    Extraction_time_ptr = strtok(NULL, ", ");
  }

  Serial.print("Dose: ");
  Serial.println(dose);
  Serial.print("Water Temperature: ");
  Serial.println(waterTemperature);
  Serial.print("waterQuantity :");
  for (int i = 0; i < waterQuantitySize; i++) {
    Serial.print(waterQuantity[i]);
    if (i < waterQuantitySize - 1) Serial.print(", ");
  }
  Serial.println();
  Serial.print("pouringTime :");
  for (int i = 0; i < Pouring_time_size; i++) {
    Serial.print(pouringTimes[i]);
    if (i < Pouring_time_size - 1) Serial.print(", ");
  }
  Serial.println();
  Serial.print("extractionTime :");
  for (int i = 0; i < Extraction_time_size; i++) {
    Serial.print(extractionTime[i]);
    if (i < Extraction_time_size - 1) Serial.print(", ");
  }
  Serial.println();
  status=true;
}


void setup() {

  Serial.begin(9600);
  connectAWS();

  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  
  lcd1.init();
  lcd1.backlight();
  lcd2.init();
  lcd2.backlight();

  scale.set_scale(calib);
  scale.tare();

  lcd2.setCursor(0, 0); 
  lcd2.print("WAIT                ");
  lcd2.setCursor(12, 0);
  lcd2.print("0:00 ");

  
}


void loop() {

  if(stopButtonState == HIGH && pour_index >= sizeof(pouringTimes) / sizeof(pouringTimes[0]) ){
  }

  int tareButtonState = digitalRead(button2);
  if(tareButtonState == HIGH){
    scale.tare();
  }
  while(true){
    if(status==true){
      break;
    }
    client.loop();
    updateWeightDisplay();
  }
  unsigned long currentMillis = millis();
  updateWeightDisplay();

  int currentButtonState = digitalRead(button1);
  if (currentButtonState == HIGH && !countdownActive && pour_index < sizeof(pouringTimes) / sizeof(pouringTimes[0])) {
    startTimers(currentMillis);
    nextindex=true;
    ready=true;
  }
  if(nextindex){
    if(pour_index == 0){
        lcd2.setCursor(0,0);
        lcd2.print(" BLOOM  ");
        nextindex = false;
    }
    else if(pour_index==1){
      lcd2.setCursor(0,0);
      lcd2.print(" SECOND  ");
      nextindex = false;
    }
    else if(pour_index==2){
      lcd2.setCursor(0,0);
      lcd2.print(" THIRD  ");
      nextindex = false;
    }
    else if(pour_index==3){
      lcd2.setCursor(0,0);
      lcd2.print(" FOURTH  ");
      nextindex = false;
    }
    else{
      lcd2.setCursor(13,1);
      lcd2.print("  ");
      lcd2.setCursor(0,0);
      lcd2.print("FINISH   ");
      nextindex = false;
      status=false;
    }
  }
  if (countdownActive) {
    updateTimers(currentMillis);
  }

  if (updateDisplay) {
    lcd1.setCursor(12, 1);
    lcd1.print(pouringTimes[pour_index] > 0 ? pouringTimes[pour_index] : 0);
    lcd1.print("  ");
    lcd2.setCursor(12, 1);
    lcd2.print(extractionTime[pour_index] > 1 ? extractionTime[pour_index] : 1);
    lcd2.print("s  ");
  } else if (pouringTimes[pour_index] <= 1 && extractionTime[pour_index] <= 1) {
    pour_index++;
    countdownActive = false;
    nextindex=true;
    tareweight=weight;
    if (pour_index < pour_size) {
      startTimers(currentMillis);
    }
  }

  int minutes = stopwatchtime / 60;
  int seconds = stopwatchtime % 60;
  char timerDisplay[6];
  sprintf(timerDisplay, "%d:%02d", minutes, seconds);
  lcd2.setCursor(12, 0);
  lcd2.print(timerDisplay);
}

void updateWeightDisplay() {
  if (scale.is_ready()) {
    weight = scale.get_units(4);
    char formattedWeight[8];
    char remainformattedWeight[8];
    sprintf(formattedWeight, "%06.1f", weight);
    lcd1.setCursor(0, 0);
    lcd1.print("WEIGHT|  POUR");
    lcd1.setCursor(0, 1);
    lcd1.print(formattedWeight);
    lcd1.print("g            ");
    if(ready){
      lcd2.setCursor(0, 1);
      float remain_weight = waterQuantity[pour_index]- (weight-tareweight);
      if(remain_weight<=0)
        lcd2.print("00.0g     ");
      else{
        sprintf(remainformattedWeight, "%06.1f", remain_weight);
        lcd2.print(remainformattedWeight);
        lcd2.print("g      ");
      }
    }
    else{
      lcd2.setCursor(0, 1);
      lcd2.print("00.0g     ");
    }
  }
}

void startTimers(unsigned long currentMillis) {
  countdownActive = true;
  previousMillis = currentMillis;
  lcd1.setCursor(12, 1);
  lcd1.print(pouringTimes[pour_index]);  
  lcd2.setCursor(12, 1);
  lcd2.print(extractionTime[pour_index]);
  lcd2.print("s  ");
}

void updateTimers(unsigned long currentMillis) {
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    updateDisplay = false;
    stopwatchtime+=1;

    if (pouringTimes[pour_index] > 0) {
      pouringTimes[pour_index]--;
      updateDisplay = true;
    }
    
    if (extractionTime[pour_index] > 1) {
      extractionTime[pour_index]--;
      updateDisplay = true;
    }

  }
}