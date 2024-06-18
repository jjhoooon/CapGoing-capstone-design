# 개인 맞춤형 드립 커피 레시피 프로젝트

<br/>

## Deploy
 URL : https://main--brewbuzzrecipe.netlify.app/

<br/>


## 프로젝트 목적
이 프로젝트의 목표는 생성형 AI를 사용하여 개인의 취향을 반영한 드립 커피 레시피를 만드는 것입니다. 드립 커피는 뜨거운 물을 커피 원두에 부어 내리는 방식으로 추출 변수(물 온도, 추출 시간, 양 등)에 따라 다양한 풍미(컵 노트)를 나타냅니다. 예를 들어, 녹색 사과, 레몬그라스, 허브 노트를 가진 커피 원두는 이러한 변수를 조정하여 해당 풍미를 증폭하거나 줄일 수 있습니다.

전통적인 카페의 드립 커피 레시피는 개인의 취향을 고려하지 않으며, 커피 원두별로 하나의 레시피만 제공하여 각 원두의 독특한 특성을 강조하지 못합니다. 이를 해결하기 위해 우리의 프로젝트는 생성형 AI를 사용하여 특정 컵 노트를 증가시키거나 감소시키고, 강도와 산도와 같은 요소를 조절하는 개인 맞춤형 드립 커피 레시피를 생성합니다. 이러한 개인 맞춤형 접근 방식은 사용자 만족도를 높이고, 사용자가 자신의 취향에 맞는 커피를 추출할 수 있도록 돕습니다.

<br/><br/>
## 배경

### 관련 기술 동향
생성형 AI는 매우 발전되어 있으며, 쇼핑과 동영상 플랫폼에서 사용자 행동과 취향을 분석하여 개인화된 추천을 제공하고 있습니다. 그러나 사용자 취향을 반영하여 새로운 레시피를 만드는 응용 프로그램은 음식 분야에 존재하지 않습니다. 기존의 커피 저울은 총 추출 시간과 무게만 표시하며, 세부적인 단계별 추출 정보는 부족합니다.

### 관련 기술 수요 및 전망
생성형 AI 기술이 발전함에 따라 사용자는 점점 더 전문화된 서비스를 원하게 될 것입니다. 전 세계적으로 6억 명 이상의 Chat-GPT 사용자가 있으며, 생성형 AI가 지속적으로 발전함에 따라 새로운 분야에 적용될 것입니다. 드립 커피 시장은 매년 성장하고 있으며, 개인 맞춤형 커피 레시피에 대한 수요는 프로젝트의 혁신적인 접근 방식으로 인해 증가할 것입니다.


<br/><br/>

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


<br/><br/>

## 설계

### 서비스 흐름도
사용자는 메인 화면에서 시작하여 로그인해야 레시피 생성 서비스를 이용할 수 있습니다. 사용자가 커피 정보와 취향을 입력하면 ChatGPT로 전송되어 레시피가 생성됩니다. 생성된 레시피는 단계별로 표시되며, 저장하거나 Arduino로 전송할 수 있습니다.

### 서비스 아키텍처
프론트엔드와 백엔드 코드 관리는 GitHub을 통해 분리됩니다. 프론트엔드는 Netlify에 배포되고, 백엔드는 AWS EC2에 배포됩니다. Certbot과 Nginx를 사용하여 HTTPS 통신을 보장합니다. AWS RDS는 데이터베이스를 관리하고, AWS IoT는 Arduino로 데이터를 안전하게 전송합니다.

### 평가 기준 및 방법
평가 기준은 컵 노트의 존재 여부 확인, 적절한 레시피 생성, 사용자 로그인 검증, 레시피 데이터를 Arduino로 전송, 그리고 Arduino에 단계별 추출 정보 표시를 포함합니다.


<br/><br/>

# 📚 기술 스택
## Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Config
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) 

## Development
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)



## Database
  ![](https://img.shields.io/badge/AmazonRDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)



## Deployment
![EC2](https://img.shields.io/badge/ec2-FF9900.svg?style=for-the-badge&logo=amazonec2&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) 


<br/><br/>

## 결론

### 결과 분석
이 프로젝트는 개인 맞춤형 드립 커피 레시피를 생성하고 따르는 과정을 자동화하여 사용자 만족도를 높이며, 개별 취향을 반영하는 데 성공했습니다. 생성형 AI의 잠재력은 이 혁신적인 응용 프로그램을 통해 입증되었습니다.

### 향후 개발
향후 개선 사항으로는 개별 AI 모델의 미세 조정을 위한 지속적인 사용자 피

드백 통합, 사용자 친화성을 위한 하드웨어 디자인 향상, 더 많은 취향과 환경을 수용할 수 있는 서비스 확장이 포함됩니다.

### 기대 결과
이 프로젝트는 개인 맞춤형 드립 커피 레시피를 제공함으로써 사용자 만족도를 높이고, 더 많은 사람들이 집에서 고품질 커피를 즐기도록 독려하며, 드립 커피 시장의 성장에 기여할 것으로 기대됩니다.

<br/>

## References
1. YM Coffee Brewing Extraction Variables: [YM커피 브루잉 추출변수 자료](https://community.unspecialty.com/column/c/9cf2913b-715d-4a73-b97c-067dbde898e5)
2. Kaggle Coffee_Data_CoffeeReview dataset: [Kaggle Coffee_Data_CoffeeReview dataset](https://www.kaggle.com/datasets/hanifalirsyad/coffee-scrap-coffeereview)
3. GPT Fine-tuning Official Documentation: [GPT Fine-tuning 공식문서](https://platform.openai.com/docs/guides/fine-tuning)
4. AWS IoT Core Official Documentation: [AWS IoT core 공식문서](https://docs.aws.amazon.com/ko_kr/iot/latest/developerguide/what-is-aws-iot.html)
5. AWS IoT and ESP32 Module Connection: [AIWS IoT와 ESP32 모듈 연결 공식문서](https://aws.amazon.com/ko/blogs/compute/building-an-aws-iot-core-device-using-aws-serverless-and-an-esp32/)
6. OpenAI API Quickstart: [OpenAI API 호출 공식문서](https://platform.openai.com/docs/quickstart?context=node)
7. Nginx Server Official Documentation: [Nginx 서버 공식문서](https://docs.nginx.com/nginx/admin-guide/web-server/)
