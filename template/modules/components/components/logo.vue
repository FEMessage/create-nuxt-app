<template>
  <div class="logo">
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <!-- Generator: Sketch 57 (83077) - https://sketch.com -->
      <desc>Created with Sketch.</desc>
      <defs>
        <rect id="path-1" x="0" y="0" width="1920" height="784" />
        <linearGradient
          id="linearGradient-3"
          x1="34.0995885%"
          y1="76.6034879%"
          x2="55.3722971%"
          y2="34.2331585%"
        >
          <stop stop-color="#CB496B" offset="0%" />
          <stop stop-color="#D25A83" offset="50.2%" />
          <stop stop-color="#DB638D" offset="100%" />
        </linearGradient>
        <linearGradient
          id="linearGradient-4"
          x1="68.1138396%"
          y1="13.2651729%"
          x2="29.1556379%"
          y2="87.4797694%"
        >
          <stop stop-color="#7E70AA" offset="0%" />
          <stop stop-color="#7678B1" offset="26.56%" />
          <stop stop-color="#5C8AC0" offset="100%" />
        </linearGradient>
        <linearGradient
          id="linearGradient-5"
          x1="0.00252407808%"
          y1="50.0015782%"
          x2="100.000253%"
          y2="50.0015782%"
        >
          <stop stop-color="#3D86BB" offset="0%" />
          <stop stop-color="#2F8BC1" offset="41.42%" />
          <stop stop-color="#188FC8" offset="100%" />
        </linearGradient>
      </defs>
      <g
        id="切图"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="index_切图" transform="translate(-1438.000000, -743.000000)">
          <g id="logo" transform="translate(0.000000, 702.000000)">
            <g id="多边形备份-4">
              <mask id="mask-2" fill="white">
                <use xlink:href="#path-1" />
              </mask>
              <g id="蒙版" />
            </g>
          </g>
          <g id="logo" transform="translate(1438.000000, 743.000000)">
            <g id="Group">
              <path
                id="Path"
                d="M8.27046729,0 C8.27046729,0 12.546028,1.52 12.6147196,4.51804878 C12.6431776,5.7697561 11.3105607,6.77853659 9.7061215,8.04097561 C7.45009346,9.81560976 4.9114486,12.3785366 3.72014019,14.2380488 C1.88803738,17.0985366 1.20602804,19.9804878 2.53373832,21.2019512 C2.53373832,21.2019512 -2.06761682,17.2868293 1.13831776,11.244878 C2.08626168,9.32585366 7.16649533,3.59804878 8.27046729,0 Z"
                fill="url(#linearGradient-3)"
              />
              <path
                id="Path"
                d="M13.4841589,6.0604878 C13.4841589,6.0604878 16.8215888,7.99804878 16.7558411,10.444878 C16.7214953,12.5590244 9.3214486,16.1258537 7.13901869,20.5229268 C6.44130841,21.862439 6.14102804,23.1112195 7.37943925,24 C4.13327103,23.635122 0.240420561,21.195122 5.41093458,14.8868293 C7.24303738,12.7073171 9.56285047,11.1297561 11.4243925,9.58634146 C12.9365888,8.33268293 14.2446729,7.42536585 13.4841589,6.0604878 Z"
                fill="url(#linearGradient-4)"
              />
              <path
                id="Path"
                d="M17.3269626,11.3034146 C17.3308879,12.1765854 16.7882243,14.7531707 13.2614019,17.257561 C9.06042056,20.1619512 7.67186916,21.6809756 8.06242991,23.195122 C8.45299065,24.7092683 13.8197664,23.2517073 16.6017757,18.4487805 C18.2945327,15.5590244 17.493785,11.4087805 17.3269626,11.3034146 Z"
                fill="url(#linearGradient-5)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default() {
        return this.$store.state.meta.appName
      },
    },
  },
}
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1f3762;
  font-size: 2em;
  font-weight: 500;
}
</style>
