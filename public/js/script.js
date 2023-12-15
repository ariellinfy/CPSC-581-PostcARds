// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/BYir9beXZ/";
let model, labelContainer, maxPredictions;

const readImageFile = (file) => {
  return new Promise((resolve) => {
    
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.readAsDataURL(file);
  });
};

const createHTMLImageElement = (imageSrc) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.src = imageSrc;
    
  });
};

const handleImageChange = async (files) => {
  const selectedFile = document.getElementById("img-input");
  const imageSrc = await readImageFile(selectedFile.files[0]);
  const image = await createHTMLImageElement(imageSrc);
  //console.log(imageSrc);
  $('#img-output').attr('src', imageSrc);
  
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const prediction = await model.predict(image);

  let result = "";

  for (let i = 0; i < maxPredictions; i++) {
    if (prediction[i].probability.toFixed(2) > 0.75) {
      result = prediction[i].className;
    }
  }
  console.log(result);
};