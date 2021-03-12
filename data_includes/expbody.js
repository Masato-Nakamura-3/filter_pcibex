PennController.ResetPrefix(null);
//PennController.DebugOff();//Comment this out when you are testing the script

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
        newText("w1", row.w1)
            .css({"font-size":"40"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w1")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,
        newText("w2", row.w2)
            .css({"font-size":"40"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w2")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("w3", row.w3)
            .css({"font-size":"40"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w3")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("w4", row.w4)
            .css({"font-size":"40"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w4")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("w5", row.w5)
            .css({"font-size":"40"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w5")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("w6", row.w6)
            .css({"font-size":"40"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w6")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("w7", row.w7)
            .css({"font-size":"40", "color":"red"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w7")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

        newText("w8", row.w8)
            .css({"font-size":"40", "color":"red"})
            .print("center at 50vw", "middle at 40vh")
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w8")
            .remove()
        ,
        newTimer(230)
            .start()
            .wait()
        ,

//        newMediaRecorder(row.filename+"_"+subject_id,"audio")
//            .record()
//        ,

//        getMediaRecorder(row.filename+"_"+subject_id)
//            .stop()
//        ,
        newText("Press the space bar")
            .print("center at 50vw", "middle at 40vh")
        ,
        newKey(" ")
            .wait()
        )
        .log("subject_id", subject_id)
        .log("item_id", row.item_id)
        .log("condition", row.condition)
        .setOption("hideProgressBar", true)
    )
