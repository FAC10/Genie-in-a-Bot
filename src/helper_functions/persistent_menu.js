// 'curl -X POST -H "Content-Type: application/json" -d '{
//   "persistent_menu":[
//     {
//       "locale":"default",
//       "composer_input_disabled":true,
//       "call_to_actions":[
//
//             {
//               "title":"Report the problem",
//               "type":"postback",
//               "payload":"Report the problem"
//             },
//             {
//               "title":"About this bot",
//               "type":"postback",
//               "payload":"About this bot"
//             },
//
//         {
//           "type":"web_url",
//           "title":"More info on June elections",
//           "url":"https://en.wikipedia.org/wiki/United_Kingdom_general_election,_2017",
//           "webview_height_ratio":"full"
//         }
//       ]
//     },
//     {
//       "locale":"zh_CN",
//       "composer_input_disabled":false
//     }
//   ]
// }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token="
