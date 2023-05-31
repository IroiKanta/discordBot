function main() {
  // const を try-catch で使うため
  const properties = (() => {
    try {
        return PropertiesService.getScriptProperties().getProperties()
    } catch (err) {
        console.log('Failed with error %s', err.message);
        return "";
    }
  })();

  // 変数の準備
  let webhookurl = properties['webhookurl_1'];
  let webhookurl2 = properties['webhookurl_2'];
  let jsonfolder = properties['json_folder_id'];

  sendMessage(webhookurl);
  sendMessage(webhookurl2);
}

function setUrl(){
  for(num in content_set){
    for(numnum in content_set[num]){
      Logger.log('test num: %s', numnum);
    }
  }
}

function loadJson(){
  var contents = DriveApp.getFolderById(jsonfolder)
  .getFilesByName('test.txt')
  .next()
  .getBlob()
  .getDataAsString("sjis");
  Logger.log(contents);
}

/**
 * 指定した URL にメッセージを送信
 * @param {string} webhookurl - webhook url
 */
function sendMessage(webhookurl) {
  // 投稿する内容と設定
  const message = {
    "content": "Hello!", // チャット本文
    "tts": false  // text to speach
  }

  const param = {
    "method": "POST",
    "headers": { 'Content-type': "application/json" },
    "payload": JSON.stringify(message)
  }

  try {
    UrlFetchApp.fetch(webhookurl, param);
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
}