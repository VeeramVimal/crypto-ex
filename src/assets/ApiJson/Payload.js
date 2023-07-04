const payload_1 = `{ 
    "email" : "test@yopmail.com" ,
    "password" : "text",
    "confirmPassword": "text",
    "terms" : true 
}`;
const payload_2 = `{ 
    "email" : "test@yopmail.com",
    "password" : "text",
    "confirmPassword": "text",
    "otp": "123456",
    "terms" : true
}`;
const payload_3 = `{ "email" : "test@yopmail.com"}`;
const payload_4 = `{ 
    "email" : "test@yopmail.com",
    "resetPasswordCode" :"738933"
}`;
const payload_5 = `{   "confirmPassword":"test@12",
    "email":"test@yopmail.com",
    "newPassword":"test@12",
    "resetPasswordCode":"808084"
}`;

const payload_10 = `{ 
    "amount" : "0.1",
    "currencyId": "61330e0fedf7c88c84357055",
    "fromAccount":"Main Wallet",
    "toAccount": "P2P Wallet" 
}`;
const payload_11 = `{ 
    "code": "111",
    "secret": "
}`;
const payload_12 = `{ 
    "newPhoneOTP" : ",
    "newPhoneno": "+911234567890",
    "pageName": "changePhoneNumber",
    "target" : "newPhoneOTP"
}`;
const payload_13 = `{
    "pageName" : "changePhoneNumber",
    "target":"oldPhoneOTP"
}`;
const payload_14 = `{
    "pageName" : "changePhoneNumber",
    "target":"oldEmailOTP"
}`;
const payload_15 = `{
    "country":"IND",
    "newPhoneno":"+918610831854",
    "newPhonenoOTP":"792554",
    "oldEmailOTP":"699241",
    "oldPhonenoOTP":"343239",
    "pageName":"changePhoneNumber",
    "phonecode":"+91"
}`;
const payload_16 = `{ 
    "newEmail" : ",
    "pageName": "changeEmail",
    "target" : "newEmailOTP"
}`;
const payload_17 = `{ 
    "target" : "oldPhoneOTP"
}`;
const payload_18 = `{
    "pageName" : "changeEmail",
    "target":"oldEmailOTP"
}`;
const payload_19 = `{
    "newEmail":"test123@gmail.com",
    "newEmailOTP":"792554",
    "oldEmailOTP":"699241",
    "oldPhonenoOTP":"343239",
    "pageName":"changeEmail",
}`;
const payload_20 = `{
    "confirmNewPassword":"Test123!",
    "newPassword":"tEst!1",
    "oldPassword":"tEst!1",
}`;
const payload_21 = `{
    "limit":"10",
    "offset":"0",
}`;
const payload_22 = `{
    'images[]':(binary) 
    'type' :'panVerify',
    pan_number: 'sadds121'
    pan_name: 'test'
}`;
const payload_23 = `{
    'images[]':(binary) 
    'images[]':(binary), 
    'type' :'aadhaarVerify',
    'aadhaar_number': '21313'
    'aadhaar_name': 'test',
    'aadhaar_address': 'Madurai',
    'aadhaar_pincode': 625527
}`;
const payload_24 = `{ 
    'images[]': (binary)
}`;
const payload_25 = `{
    "pan_number":"Acsd233",
    "type":"panVerify"
}`;
const payload_26 = `{
    "aadhaar_number":"11111233333",
    "type":"generateOtp"
}`;
const payload_27 = `{
    "aadhaarOtp":"132339",
    "type":"submitOtp"
}`;
const payload_28 = `{
    "images[]": (binary)
}`;
const payload_29 = `{
    "bankdetails":  {
        "Account Number" : "212132132",
        "Account Type" : "Savings",
        "Bank Name" : "SBI",
        "IFSC Code" : "SBI@2121"
    }
}`;

const payload_32 = `{
    "_id": "63a29e623f5f422ecedbd82b"
}`;

const payload_34 = `{
    "limit" : 10,
    "offset" : 10
}`;
const payload_35 = `{
    "CurrencyID" : "636a387630c84a18148d418f"
}`;
const payload_36 = `{
    "CurrencyID" : "636a387630c84a18148d418f"
}`;
const payload_37 = `{
    "currencySymbol" : "BNB",
    "currencyType" : "Crypto",
    "type"  : "Deposit"
}`;
const payload_38 = `{
    "images[]" :  = {binary};
}`;
const payload_39 = `{
    "amount" : "100",
    "attachment" : "https://res.cloudinary.com/dweqs7aoz/image/upload/v1671609511/Images/kjgnkrlfvt22jri719q1.png",
    "currencyId" : "5e60ead7fefec8644823c355",
    "transactionNumber" : "tnx@20"
}`;

const payload_41 = `{
  
    "currencyType" : "Fiat"
    "type"  : "Deposit"
}`;
const payload_42 = `{
    "CurrencyID" : "636a387630c84a18148d418f"
}`;
const payload_43 = `{
    "address":"dwewqeqwewq",
    "amount":"100",
    "currencyId":"5fb7c15af1aa6b78d0a0446a",
    "tag":"
}`;
const payload_44 = `{
  
    "currencySymbol": "BTC",
    "currencyType" : "Crypto"
    "type"  : "Withdraw"
}`;
const payload_45 = `{
    "amount":"100",
    "currencyId":"5e60ead7fefec8644823c355",
    "paymentId":"639c1d0ec27ed6135ddd1241",
    "tfaCode":",
    "withdrawOTP":"
}`;
const payload_46 = `{
    "amount":"100",
    "currencyId":"5e60ead7fefec8644823c355",
    "paymentId":"639c1d0ec27ed6135ddd1241",
    "tfaCode":"883347",
    "withdrawOTP":"858250"
}`;

const payload_48 = `{
    "currencyId":"61330e7dedf7c88c84357063"
}`;

const payload_51 = `{
    "pair":"BTC_INR"
}`;

const payload_54 = `{
    "orderId" : "63b3d5dad91e641475792e49"
}`;
const payload_55 = `{
    "limit" : 25,
    "offset" : 25
}`;
const payload_56 = `{
    "endTime":1670884113000,
    "interval":"1h",
    "pair":"I-BTC_INR",
    "startTime":1670794113000
}`;

const payload_58 = `{
    "from":"home"
}`;
const payload_59 = `{
    "type":"common"
}`;
const payload_60 = `{
    "identify":"about",
    "type":"
}`;
const payload_61 = `{
    "identify": "privacy"
}`;
const payload_62 = `{
    "identify":"terms",
    "type":"
}`;
const payload_63 = `{
    "identify":"contactus",
    "type":"
}`;
const payload_64 = `{
    "OTPCode":"123456",
    "accountNo":"12121121321",
    "holderName":"MUTHUKUMAR P",
    "ifscCode":"sada",
    "paymentmethodId":"62cff588bd3cf49fc3b83c7b",
    "paymenttype":"Bank",
    "userId":"6381b0bed550bf04ba2a2741"
}`;

const payload_68 = `{
    "pair":"USDT_INR",
    "type":"buy"
}`;

const payload_70 = `{
    "currencyId":"5fb7c15af1aa6b78d0a0446a",
}`;

const payload_72 = `{
    "pair":"USDT_INR"
}`;
const payload_73 = `{
    "pair":"USDT_INR"
}`;

const payload_76 = `{
    "authCode":"939431",
    "passData":  {
        "autoreply":"Hello",
        "checkedKyc":true,
        "country":[ {l"label":"Select All","value":"*"},{"label":"Afghanistan","value":"Afghanistan"}],
        "floatingPrice":0,
        "fromCurrency":"5fb7c15af1aa6b78d0a0446a",
        "highestPrice":86.56,
        "holdingBTC":"0.01",
        "holdingStatus":true,
        "lowestPrice:0,
        "maxAmt":"8601.00",
        "minAmt":100,
        "orderType":"buy",
        "pairId":"62fb41f30391b88ca123e0b9",
        "pairName":"USDT_INR",
        "paymentId":["62cff588bd3cf49fc3b83c7b","62cff57dbd3cf49fc3b83c3d"],
        "paymentNames":["Bank","UPI"],
        "price":"86.01",
        "priceType":"Fixed",
        "registeredDays":"4",
        "registeredStatus":true,
        "remarks":"Please call me",
        "timeLimit":15,
        "toCurrency":"5e60ead7fefec8644823c355",
        "totalPrice":8601,
        "usdtPrice":"100",
        "userId":"63747329ca6d740b197dd708"
    },
    "userId":"63747329ca6d740b197dd708"
}`;
const payload_77 = `{
    "advStatus": "All Status",
    "assetType": "All assets",
    "tradeType": "All Status"
}`;
const payload_78 = `{
    "editId" : "63b3e89ed91e6414757934a6"
}`;
const payload_79 = `{ "orderId" : "63ca6efa22eb6dc9357ce947" }`;
const payload_80 = `{
    "type": "processing"
}`;
const payload_81 = `{
    "filterDates" : [1673000276837,1674216285283],
    "tradeStatus" : "All Status",
    "tradeType" : "All Status",
    "type" : "all"
}`;
const payload_82 = `{
    "countryName": "All Regions",
    "orderType": "buy",
    "pair": "USDT_INR",
    "payTypes":"All payments",
    "searchprice":"
}`;
const payload_83 = `{
    "from":"p2p-home"
}`;
const payload_84 = `{
    "type": "p2p"
}`;
const payload_85 = `{
    "orderId":"63999a60326c82fd5bf64c0d",
    "orderLimit":15,
    "orderType":"buy",
    "ownerId":"638434b8641b8c9553d75e27",
    "pairId":"62fb41f30391b88ca123e0b9",
    "paymentId":["639016fae6f884d032dc85df"],
    "price":"100",
    "totalPrice":"1.17",
    "userId":"63747329ca6d740b197dd708"
}`;
const payload_86 = `{
    "orderNo":"3795275741182964"
}`;
const payload_87 = `{
    "advertiserNo":"638434b8641b8c9553d75e27"
}`;
const payload_88 = `{
    "orderNo":"3795275741182964"
}`;
const payload_89 = `{
    "orderNo":"2254619605819330",
    "userId":"63747329ca6d740b197dd708"
}`;
const payload_90 = `{
    "OTPCode":"257441",
    "orderNo":"6096176834664355",
    "userId":"6381b0bed550bf04ba2a2741"
}`;
const payload_91 = `{
    "orderNo": "8426008373786384",
    "reason": "I do not want to trade anyone",
    "type": "cancelorder",
    "userId": "6381b0bed550bf04ba2a2741"
}`;
const payload_92 = `{
    "images[]":(binary)
}`;
const payload_93 = `{
    "attachment": "https://res.cloudinary.com/dweqs7aoz/image/upload/v1672222520/Images/s5y1vnyuq4bzvvxzbnxa.png",
    "description": "test",
    "orderNo": "3795275741182964",
    "phone": "1234567899",
    "reasonAppeal": "I paid extra money to the seller.",
    "userId": "63747329ca6d740b197dd708"
}`;
const payload_94 = `{
    "orderNo": "3795275741182964"
}`;
const payload_95 = `{
    "images[]":(binary)
}`;
const payload_96 = `{
    "attachment": "https://res.cloudinary.com/dweqs7aoz/image/upload/v1672222520/Images/s5y1vnyuq4bzvvxzbnxa.png",
    "description": "test",
    "orderNo": "3795275741182964",
    "phone": "1234567899",
    "userId": "63747329ca6d740b197dd708"
}`;
const payload_97 = `{
 "orderNo": "3795275741182964"   
}`;
const payload_98 = `{
    "buyerId": "63747329ca6d740b197dd708",
    "orderNo": "3795275741182964",
    "supportMessage": "Hello"
}`;
const payload_99 = `{
    userId : "63918436b93a7e13e2df6650"
}`;
const payload_100 = `{ "userId": "63918436b93a7e13e2df6650"}`;
const payload_101 = `{ "userId": "63918436b93a7e13e2df6650"}`;
const payload_102 = `{
    "advertiserNo" : "63747329ca6d740b197dd708",
    "status": 1,
    "type" : "blockuser",
    "userId": "63918436b93a7e13e2df6650
}`;
const payload_103 = `{ "userId": "63918436b93a7e13e2df6650"}`;
const payload_104 = `{
    "accountNo": "601701525508",
    "accountType": ",
    "attachment": ",
    "bankName": ",
    "branch": ",
    "createdDate": "2023-01-04T13:51:39.887Z",
    .....
}`;
const payload_105 = `{
    "advertiserNo": "6381b0bed550bf04ba2a2741"
}`;
const payload_106 = `{
    "advertiserNo" : "6381b0bed550bf04ba2a2741"
}`;
export default {
    payload_1, payload_2, payload_3, payload_4, payload_5,  payload_10, payload_11, payload_12, payload_13,
    payload_14, payload_15, payload_16, payload_17, payload_18, payload_19, payload_20, payload_21, payload_22, payload_23, payload_24, payload_25, payload_26,
    payload_27, payload_28, payload_29,  payload_32,  payload_34, payload_35, payload_36, payload_37, payload_38, payload_39,
    payload_41, payload_42, payload_43, payload_44, payload_45, payload_46,  payload_48,  payload_51, 
    payload_54, payload_55, payload_56,  payload_58, payload_59, payload_60, payload_61, payload_62, payload_63, payload_64, 
    payload_68,  payload_70,  payload_72, payload_73,  payload_76, payload_77, payload_78,
    payload_79, payload_80, payload_81, payload_82, payload_83, payload_84, payload_85, payload_86, payload_87, payload_88, payload_89, payload_90, payload_91,
    payload_92, payload_93, payload_94, payload_95, payload_96, payload_97, payload_98, payload_99, payload_100, payload_101, payload_102, payload_103, payload_104,
    payload_105, payload_106,
};
