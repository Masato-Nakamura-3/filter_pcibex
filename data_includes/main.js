PennController.ResetPrefix(null);
//PennController.DebugOff();//Comment this out when you are testing the script

//Set the Sequence
// Make sure you include InitiateRecorder and SendResults
Sequence("consent_form", "initiate-recorder","introduction",randomize(anyOf("exp8", "exp9")));

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






//body of the short trials
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
        newTimer(300)
            .start()
            .wait()
        ,
        getText("w9")
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
