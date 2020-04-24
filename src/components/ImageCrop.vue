<template>
  <div class="bg-crop flex flex-col absolute top-0 left-0 h-full w-full justify-center z-30">
    <div class="inner flex flex-wrap w-10/12 mx-auto p-4 border border-primary">
      <div class="w-full">
        <div class="flex justify-center relative mx-auto block">
          <croppa v-model="croppa" :width="width" :height="height" :accept="'image/*'"></croppa>
        </div>
        <p class="mt-4 mb-2 pl-6 text-sm">Click the "Choose Image" above. Once you select an image, you can:</p>
        <ul class="list-disc pl-12 text-xs mb-4">
          <li>Drag image to desired centred view</li>
          <li>Pinch or scroll down to zoom in</li>
          <li>put fingers together and spread apart or scroll up to zoom out</li>
        </ul>
      </div>
      <div class="flex flex-wrap w-full">
        <button class="w-full md:w-1/2 btn-primary py-1 w-1/2" @click="uploadCroppedImage">Upload</button>
        <button class="w-full md:w-1/2 bg-white py-1 w-1/2" @click="$emit('dismiss')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCropModal',
  props: {
    height: {
      type: Number,
      default: 400,
    },
    width: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      croppa: {},
    };
  },
  methods: {
    uploadCroppedImage() {
      this.croppa.generateBlob(
        async (blob) => {
          this.$emit('complete', blob);
        },
        'image/*',
        0.8,
      );
    },
  },
};
</script>

<style lang="scss">
  .bg-crop {
    background: rgba($color: #FFFFFF, $alpha: 0.8);

    .inner {
      background-color: white;
    }
  }

  .croppa-container {
    background-color: white;
    border: 3px solid #CE9833;
    overflow: hidden;

    canvas {
      background-color: black;
      border: 3px solid white;
    }
  }
</style>
