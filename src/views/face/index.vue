<template>
  <div>
    <img id="myImg" src="/static/face.png" />
    <canvas id="myCanvas" />
  </div>
</template>

<script>
// import "@tensorflow/tfjs-node";

// import * as canvas from "canvas";

// import * as faceapi from "face-api.js";
export default {
  data() {
    return {};
  },
  // methods: {
  //   async recognizeFace() {
  //     const { Canvas, Image, ImageData } = canvas;
  //     faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  //     console.log(faceapi.nets);
  //     const MODEL_URL = "/models";
  //     await faceapi.loadModels(MODEL_URL);
  //     const input = document.getElementById("myImg");
  //     const detection = await faceapi.detectSingleFace(input);
  //     const detectionWithLandmarks = await faceapi
  //       .detectSingleFace(input)
  //       .withFaceLandmarks();
  //     console.log(detectionWithLandmarks);
  //   },
  // },
};
</script>

<style lang="less" scoped></style>
