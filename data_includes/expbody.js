PennController.ResetPrefix(null);
PennController.DebugOff();//Comment this out when you are testing the script

//Set the Sequence
// Make sure you include InitiateRecorder and SendResults

//Edit the uploading error message
const replaceUploadingErrorMessage = ()=>{
    const uploadingErrorMessage = $(".PennController-PennController p:nth-child(2)");
    if (uploadingErrorMessage.length > 0 && uploadingErrorMessage[0].innerHTML.match(/^There was an error uploading the recordings:/))
        uploadingErrorMessage.html("サーバーにデータをアップロードする際に問題が発生しました。<br>下のリンクから録音データをダウンロードしてください。ダウンロードしたファイルは、解凍せずにファイル名を'[クラウドワーカー名]_[参加者ID]'とした上で、https://ter.ps/clearupload0にアップロードしてください。(例:田中太郎_hd8kT37g)")//The text for the error message
            .siblings(".Message-continue-link").html("録音データをダウンロードする");//The text for the link to the recordings
    else
        window.requestAnimationFrame( replaceUploadingErrorMessage );
};
replaceUploadingErrorMessage();



// Define a function to generate subject IDs which is a squence of 4 letters
// The ID is used to name the recording files
function getRandomStr(){
    const LENGTH = 4
    const SOURCE = "abcdefghijklmnopqrstuvwxyz"
    let result = ''

    for(let i=0; i<LENGTH; i++){
        result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }

  return result
}

// Generate a subject ID
const subject_id = getRandomStr()

// Consent form


// Initiate recorder for later use
// This part also inserts a consent for recording
// The consent link can be edited by the script above (replaceConsentMic)
// The URL should be referring to the php file in your directory in your server
// See the LSC server instruction for the detail
InitiateRecorder("https://hjpatt-136.umd.edu/Web_Experiments/Phillips/Masato/PCIbex.php",
    "この実験プログラムは音声を録音し、記録します。<strong>このプログラムが録音機器を使用している間は、ページ上部に「Recording」と表示されます。</strong>この実験プログラムが実験参加者様の録音機器にアクセスすることに同意していただける場合には、下の「同意する」をクリックしてください。"
    )
    .setOption("hideProgressBar", true)
    .label("initiate-recorder");

// Recording test
// Participants record their voice and hear it to make sure the recorder is working
newTrial("recording_test",
    newText("この実験では録音を行います。実験を始める前に、録音のテストをしてください。")
        .bold()
        .print()
    ,
    newText("「これはテストです。」という音声を録音してください。")
        .print()
    ,
    newText("下の「Record」ボタンを押すと録音が始まり、「Stop」ボタンを押すと停止します。ご自分の音声が録音されたか確かめるためには、再生ボタンを押してください。<br><br>")
        .print()
    ,
    newMediaRecorder("test-recorder", "audio")
        .print()
    ,
    newText("<br>ご自分の音声がはっきりと録音されていることを確かめてから次に進んでください。<br>")
        .print()
    ,
    newText("実験中には自動で録音が開始・停止します。録音中は画面の上部に赤色の背景で<strong>Recording</strong>と表示されます。<br><br>")
        .print()
    ,
    newButton("continue", "次へ進む")
    .print()
    .wait(
        getMediaRecorder("test-recorder").test.recorded()
            .failure(
                newText("次へ進む前に、きちんと録音できているか確認してください。")
                    .color("red")
                    .print())
      )
).setOption("hideProgressBar", true);



//body of the short trials
Template(
    GetTable("stimuli.csv")
        .filter( row => row.type == "exp")
    , row =>
    newTrial("exp",
        newText("cross","+")
            .css({"font-size":"40"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(800)
            .start()
            .wait()
        ,
        getText("cross")
            .remove()
        ,
        newText("stimulus", row.w1)
            .css({"font-size":"40", "color":"red"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newMediaRecorder(row.filename+"_"+subject_id,"audio")
            .record()
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("stimulus")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("stimulus", row.w2)
            .css({"font-size":"40", "color":"red"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newMediaRecorder(row.filename+"_"+subject_id,"audio")
            .record()
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("stimulus")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("stimulus", row.w3)
            .css({"font-size":"40", "color":"red"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newMediaRecorder(row.filename+"_"+subject_id,"audio")
            .record()
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("stimulus")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        getMediaRecorder(row.filename+"_"+subject_id)
            .stop()
        ,
        newText("Press the space bar")
            .print("center at 50vw", "middle at 40vh")
        ,
        newKey(" ")
            .wait()
        )
        .log("subject_id", subject_id)
        .log("item_id", row.item_id)
        .log("condition", row.a)
        .setOption("hideProgressBar", true)
    )






// Exit form to collect worker data
// See exit.html for the detail
newTrial("exit_form1",
    newFunction( ()=>$("body").removeClass('standout') ).call(),
    newHtml("exit", "exit.html")
        .print()
        .log("worker_id","identifier"),
    newButton("データを送信し、実験コードを確認する")
        .print()
        .wait(getHtml("exit").test.complete()
            .failure( getHtml("exit").warn() ))

).setOption("hideProgressBar", true);

// Send the result to the server
SendResults("send_results");

// Exit
newTrial("exit",
    newHtml("exit2","exit2.html")
        .print()
    ,
    newTimer(1)
        .wait()
).setOption("hideProgressBar", true);
