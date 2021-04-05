PennController.ResetPrefix(null);
//PennController.DebugOff();//Comment this out when you are testing the script

//Set the Sequence
// Make sure you include InitiateRecorder and SendResults
Sequence("initiate-recorder", "recording_test","introduction",randomize(anyOf("exp8", "exp9")));

// Add "consent_form",  before publishing



const replaceUploadingErrorMessage = ()=>{
    const uploadingErrorMessage = $(".PennController-PennController p:nth-child(2)");
    if (uploadingErrorMessage.length > 0 && uploadingErrorMessage[0].innerHTML.match(/^There was an error uploading the recordings:/))
        uploadingErrorMessage.html("There was an error uploading the recordings.<br>Please download the recordings from the link below and upload it following the instructions on the AMT webpage.")
            .siblings(".Message-continue-link").html("Download the recordings");//The text for the link to the recordings
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
newTrial("consent_form",
    newHtml("consent", "consent.html")
        .settings.checkboxWarning("Required")
        .settings.radioWarning("Required")
        .settings.inputWarning("Required")
        .print()
        .log()
    ,
    newButton("I agree to participate in this study")
        .print()
        .wait(
            getHtml("consent").test.complete()
            .failure( getHtml("consent").warn() ))
).setOption("hideProgressBar", true);



InitiateRecorder("https://hjpatt-136.umd.edu/Web_Experiments/Phillips/Masato/PCIbex.php")
    .setOption("hideProgressBar", true)
    .label("initiate-recorder");


newTrial("recording_test",
    newText("This experiment involves audio recording.  Before you start the experiment, please test your recording.")
        .bold()
        .print()
    ,
    newText("Please record yourself saying the sentence 'This is a test' (this recording will be saved).  To start the recording, press the Record button.  To stop the recording, press Stop.  To test whether your voice was recorded, click the play button.<br><br>")
        .print()
    ,
    newMediaRecorder("test-recorder", "audio")
        .print()
    ,
    newText("<br>Make sure you can hear your voice clearly in the playback before you continue.<br>")
        .print()
    ,
    newText("During the experiment, recordings will start and stop automatically.  There is a notification at the top of the page that will indicate when audio is being recorded.<br><br>")
        .print()
    ,
    newButton("continue", "Click here to continue")
    .print()
    .wait(
        getMediaRecorder("test-recorder").test.recorded()
            .failure(
                newText("Please test your audio recording before continuing")
                    .color("red")
                    .print())
      )
).setOption("hideProgressBar", true);

newTrial("introduction",
    newHtml("introduction.html")
        .print()
    ,
    newButton("Proceed")
        .print()
        .wait()
).setOption("hideProgressBar", true);




// Istruction
newTrial("instruction",
    newHtml("instruction.html")
        .print()
    ,
    newButton("See good and bad examples")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);





Template(
    GetTable("stimuli.csv")
        .filter( row => row.context_n == 7)
    , row =>
    newTrial("exp7",
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
        newMediaRecorder(row.filename+"_"+subject_id,"audio")
            .record()
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w7")
            .remove()
        ,

        newTimer(4000)
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
        .log("condition", row.condition)
        .setOption("hideProgressBar", true)
    )


Template(
    GetTable("stimuli.csv")
        .filter( row => row.context_n == 8)
    , row =>
    newTrial("exp8",
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
            .css({"font-size":"40"})
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
        newMediaRecorder(row.filename+"_"+subject_id,"audio")
            .record()
        ,
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w8")
            .remove()
        ,
        newTimer(4000)
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
        .log("condition", row.condition)
        .setOption("hideProgressBar", true)
    )

Template(
    GetTable("stimuli.csv")
        .filter( row => row.context_n == 9)
    , row =>
    newTrial("exp9",
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
            .css({"font-size":"40"})
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
            .css({"font-size":"40"})
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

        newText("w9", row.w9)
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
        getText("w9")
            .remove()
        ,
        newTimer(4000)
            .start()
            .wait()
        ,
        getMediaRecorder(row.filename+"_"+subject_id)
            .stop()
        ,
                ,
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
