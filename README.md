# 개인 맞춤형 드립 커피 레시피 프로젝트

## Deploy
 URL : https://main--brewbuzzrecipe.netlify.app/

## 프로젝트 목적
이 프로젝트의 목표는 생성형 AI를 사용하여 개인의 취향을 반영한 드립 커피 레시피를 만드는 것입니다. 드립 커피는 뜨거운 물을 커피 원두에 부어 내리는 방식으로 추출 변수(물 온도, 추출 시간, 양 등)에 따라 다양한 풍미(컵 노트)를 나타냅니다. 예를 들어, 녹색 사과, 레몬그라스, 허브 노트를 가진 커피 원두는 이러한 변수를 조정하여 해당 풍미를 증폭하거나 줄일 수 있습니다.

전통적인 카페의 드립 커피 레시피는 개인의 취향을 고려하지 않으며, 커피 원두별로 하나의 레시피만 제공하여 각 원두의 독특한 특성을 강조하지 못합니다. 이를 해결하기 위해 우리의 프로젝트는 생성형 AI를 사용하여 특정 컵 노트를 증가시키거나 감소시키고, 강도와 산도와 같은 요소를 조절하는 개인 맞춤형 드립 커피 레시피를 생성합니다. 이러한 개인 맞춤형 접근 방식은 사용자 만족도를 높이고, 사용자가 자신의 취향에 맞는 커피를 추출할 수 있도록 돕습니다.

## 디자인 주제
이 프로젝트는 생성형 AI를 사용하여 개인의 취향을 반영한 수정된 드립 커피 레시피를 생성하고, 이를 무게 센서가 장착된 Arduino에 전송하는 것입니다. Arduino는 LCD 화면에 레시피 정보를 표시하여 사용자가 커피 추출 과정을 안내받을 수 있도록 합니다.

## 문제 정의
- **성능 - 응답 시간:** 생성형 AI를 사용하여 개인 맞춤형 드립 커피 레시피를 생성하는 데 지연이 발생할 수 있습니다. 컵 노트를 예측하기 위한 모델의 미세 조정 과정에서도 지연이 발생합니다. 생성형 AI 모델과 서버 간의 지연을 줄이는 것이 중요합니다.
- **데이터 - 입력:** 정확한 데이터 수집이 어려운 상황입니다. 커피 원두는 품종, 원산지, 가공 방법, 로스팅 단계 등에서 큰 차이를 보이며, 이는 컵 노트를 예측하기 위한 데이터의 한계를 초래합니다. 또한, 기존 컵 노트 데이터의 정확성을 검증하는 것도 필요합니다.
- **경제성 - 수익:** 개인의 취향을 반영한 드립 커피 레시피를 제공하기 위해 새로운 시장을 개발해야 합니다. 현재 시장은 개인의 취향에 맞추기 위해 여러 번의 시도가 필요한 표준화된 레시피를 제공합니다. 우리의 서비스는 이러한 수요를 충족시키기 위해 고안되었습니다.
- **서비스 - 확장성 및 안정성:** 현재 시스템은 프로젝트의 웹 플랫폼에서만 운영되며 다양한 사용자 취향을 반영하는 데 어려움이 있습니다. 또한, Arduino 저울은 위치에 제한이 있습니다.
- **서비스 - 예외 처리:** 생성형 AI는 ChatGPT에 의존하므로 ChatGPT에 문제가 발생할 경우 문제가 생길 수 있습니다. 시스템은 예기치 않은 사용자 입력에 대해 어려움을 겪을 수 있습니다.

## 배경

### 관련 기술 동향
생성형 AI는 매우 발전되어 있으며, 쇼핑과 동영상 플랫폼에서 사용자 행동과 취향을 분석하여 개인화된 추천을 제공하고 있습니다. 그러나 사용자 취향을 반영하여 새로운 레시피를 만드는 응용 프로그램은 음식 분야에 존재하지 않습니다. 기존의 커피 저울은 총 추출 시간과 무게만 표시하며, 세부적인 단계별 추출 정보는 부족합니다.

### 관련 기술 수요 및 전망
생성형 AI 기술이 발전함에 따라 사용자는 점점 더 전문화된 서비스를 원하게 될 것입니다. 전 세계적으로 6억 명 이상의 Chat-GPT 사용자가 있으며, 생성형 AI가 지속적으로 발전함에 따라 새로운 분야에 적용될 것입니다. 드립 커피 시장은 매년 성장하고 있으며, 개인 맞춤형 커피 레시피에 대한 수요는 프로젝트의 혁신적인 접근 방식으로 인해 증가할 것입니다.

## 요구 사항 분석

### 기능 요구 사항
- **AI 요구 사항:**
  - 사용자 취향을 반영한 레시피 생성.
  - 표준 형식 내에서 레시피 생성.
  - 지정된 형식으로 레시피 출력.
  - 원두 정보가 없을 때 다른 원두 정보를 사용하여 컵 노트 예측.
- **웹 요구 사항:**
  - 컵 노트 정보가 있는지 여부를 고려한 UI 설계.
  - 사용자가 서비스를 사용하려면 등록 및 로그인이 필요.
  - 커피 원두 정보와 취향을 입력할 수 있는 양식 제공.
  - 웹에서 단계별 레시피 정보 표시.
  - 레시피 정보를 AWS IoT로 전송.
  - 생성된 레시피를 사용자에게 저장할 수 있는 기능 제공.
- **Arduino 요구 사항:**
  - 시작/제로 보정 기능 제공.
  - 추출 단계 및 총 시간 표시.
  - 단계별 물 양, 블룸 타임, 추출 시간 표시.
  - 총 무게 표시.
  - AWS IoT로부터 메시지 수신.

### 성능 사양
- 레시피는 JSON 형식으로 출력되어야 합니다.
- 표준 레시피 형식을 따라야 합니다.
- ChatGPT의 응답을 객체 형식으로 파싱해야 합니다.
- 레시피 데이터를 주제 규칙을 사용하여 AWS IoT로 전송해야 합니다.
- HTTPS를 사용하여 안전한 API 요청 및 응답을 보장해야 합니다.
- 저울은 0.1g의 정밀도로 최대 5kg까지 인식해야 합니다.
- LCD 화면에 초 단위로 시간을 표시해야 합니다.
- AWS IoT로부터 MQTT 메시지를 수신해야 합니다.

## 제약 사항

### 운영 환경
Arduino에 레시피 정보를 자동으로 전송하려면 백엔드 서버를 AWS EC2에 Nginx와 함께 배포해야 합니다. ESP32 Wi-Fi 모듈은 저대역폭 환경(2.4GHz-2.5GHz)만 지원합니다.

### 개발 환경
- **운영체제:** Windows 10
- **디자인:** Figma
- **배포:** Netlify, AWS EC2, Nginx, Certbot
- **데이터베이스:** AWS RDS, MySQL
- **언어:** React, Node.js, Express
- **툴:** Vscode
- **협업:** GitHub

### 경제적 제약 사항
- 생성형 AI 미세 조정 및 API 호출 비용.
- Arduino 및 센서 구매 비용.
- 도메인 이름 구매 비용.
- 서버 유지 비용.

## 설계

### 서비스 흐름도
사용자는 메인 화면에서 시작하여 로그인해야 레시피 생성 서비스를 이용할 수 있습니다. 사용자가 커피 정보와 취향을 입력하면 ChatGPT로 전송되어 레시피가 생성됩니다. 생성된 레시피는 단계별로 표시되며, 저장하거나 Arduino로 전송할 수 있습니다.

### 서비스 아키텍처
프론트엔드와 백엔드 코드 관리는 GitHub을 통해 분리됩니다. 프론트엔드는 Netlify에 배포되고, 백엔드는 AWS EC2에 배포됩니다. Certbot과 Nginx를 사용하여 HTTPS 통신을 보장합니다. AWS RDS는 데이터베이스를 관리하고, AWS IoT는 Arduino로 데이터를 안전하게 전송합니다.

### 평가 기준 및 방법
평가 기준은 컵 노트의 존재 여부 확인, 적절한 레시피 생성, 사용자 로그인 검증, 레시피 데이터를 Arduino로 전송, 그리고 Arduino에 단계별 추출 정보 표시를 포함합니다.

## 구현

### 구현 도구
- **레시피 생성:** Chat GPT-4
- **웹 인터페이스:** React
- **웹 서버:** Node.js
- **임베디드 하드웨어:** ESP WROOM 32 Wi-Fi, HX711 스케일, I2C LCD 모듈
- **개발 편집기:** Vscode
- **버전 관리:** GitHub
- **디자인 도구:** Figma

## 결과

### AI
생성형 AI는 사용자 취향을 반영한 적절한 드립 커피 레시피를 생성하며, 전문가 비교를 통해 검증되었습니다. 미세 조정된 모델은 기존 데이터가 없는 원두의 컵 노트를 정확하게 예측합니다.

### 웹
웹 인터페이스는 사용자가 커피 정보와 취향을 입력하고, 개인 맞춤형 레시피를 생성하며, 단계별 지침을 볼 수 있도록 합니다. 사용자는 레시피를 저장하거나 Arduino로 전송할 수 있습니다.

### Arduino
Arduino 설정은 AWS IoT로부터 MQTT를 통해 레시피 데이터를 수신하며, LCD에 단계별 추출 지침을 상세하게 표시하여 사용자를 안내합니다.

## 결론

### 결과 분석
이 프로젝트는 개인 맞춤형 드립 커피 레시피를 생성하고 따르는 과정을 자동화하여 사용자 만족도를 높이며, 개별 취향을 반영하는 데 성공했습니다. 생성형 AI의 잠재력은 이 혁신적인 응용 프로그램을 통해 입증되었습니다.

### 향후 개발
향후 개선 사항으로는 개별 AI 모델의 미세 조정을 위한 지속적인 사용자 피

드백 통합, 사용자 친화성을 위한 하드웨어 디자인 향상, 더 많은 취향과 환경을 수용할 수 있는 서비스 확장이 포함됩니다.

### 기대 결과
이 프로젝트는 개인 맞춤형 드립 커피 레시피를 제공함으로써 사용자 만족도를 높이고, 더 많은 사람들이 집에서 고품질 커피를 즐기도록 독려하며, 드립 커피 시장의 성장에 기여할 것으로 기대됩니다.

# 📚 STACKS 
## Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Config
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) 

## Development
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)



## Database
  ![](https://img.shields.io/badge/AmazonRDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)



## Deployment
![EC2](https://img.shields.io/badge/ec2-FF9900.svg?style=for-the-badge&logo=amazonec2&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) 

## References
1. YM Coffee Brewing Extraction Variables: [YM커피 브루잉 추출변수 자료](https://community.unspecialty.com/column/c/9cf2913b-715d-4a73-b97c-067dbde898e5)
2. Kaggle Coffee_Data_CoffeeReview dataset: [Kaggle Coffee_Data_CoffeeReview dataset](https://www.kaggle.com/datasets/hanifalirsyad/coffee-scrap-coffeereview)
3. GPT Fine-tuning Official Documentation: [GPT Fine-tuning 공식문서](https://platform.openai.com/docs/guides/fine-tuning)
4. AWS IoT Core Official Documentation: [AWS IoT core 공식문서](https://docs.aws.amazon.com/ko_kr/iot/latest/developerguide/what-is-aws-iot.html)
5. AWS IoT and ESP32 Module Connection: [AIWS IoT와 ESP32 모듈 연결 공식문서](https://aws.amazon.com/ko/blogs/compute/building-an-aws-iot-core-device-using-aws-serverless-and-an-esp32/)
6. OpenAI API Quickstart: [OpenAI API 호출 공식문서](https://platform.openai.com/docs/quickstart?context=node)
7. Nginx Server Official Documentation: [Nginx 서버 공식문서](https://docs.nginx.com/nginx/admin-guide/web-server/)
