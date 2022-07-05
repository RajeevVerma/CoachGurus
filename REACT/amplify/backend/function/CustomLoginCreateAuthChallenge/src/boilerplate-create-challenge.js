/* tslint:disable */
/* eslint-disable */
const AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  //Create a random number for otp
  let challengeAnswer = Math.random().toString(10).substr(2, 6);
  const phoneNumber = event.request.userAttributes.phone_number;

  //For Debugging
  console.log(event, context);

  if (phoneNumber === '+918380088317') {
    //sns sms
    const sns = new AWS.SNS({ region: 'ap-south-1' });
    sns.publish(
      {
        Message: 'your otp: ' + challengeAnswer,
        PhoneNumber: phoneNumber,
        MessageStructure: 'string',
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: 'AMPLIFY',
          },
          'AWS.SNS.SMS.SMSType': {
            DataType: 'String',
            StringValue: 'Transactional',
          },
        },
      },
      function (err, data) {
        if (err) {
          console.log(err.stack);
          console.log(data);
          return;
        }
        console.log(`SMS sent to ${phoneNumber} and otp = ${challengeAnswer}`);
        return data;
      }
    );
  } else {
    challengeAnswer = 9808;
  }
  //set return params
  event.response.privateChallengeParameters = {};
  event.response.privateChallengeParameters.answer = challengeAnswer;
  event.response.challengeMetadata = 'CUSTOM_CHALLENGE';

  callback(null, event);
};
