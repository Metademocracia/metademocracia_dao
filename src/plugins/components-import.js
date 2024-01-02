// ? imported from the app
import FullScreen from '@/components/helpers/full-screen.vue'
import ModalConfirm from '@/components/modals/modal-confirm.vue'
import VImgLoad from '@/components/helpers/v-img-load.vue'
import VImgInput from '@/components/helpers/v-img-input.vue'
import VAvatarUpload from '@/components/helpers/v-avatar-upload.vue'
import Toolbar from '@/components/toolbar.vue'
import StickyDrawer from '@/components/sticky-drawer.vue'

// ? imported from external
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { VOtpInput } from 'vuetify/labs/VOtpInput'
import { VDataTable, VDataTableServer } from 'vuetify/labs/VDataTable'
// import VueApexChart from "vue3-apexcharts"
import VueRecaptcha from 'vue3-recaptcha2'

export default {
  VSkeletonLoader,
  VOtpInput,
  VDataTable,
  VDataTableServer,
  // VueApexChart,
  VueRecaptcha,
  FullScreen,
  ModalConfirm,
  VImgLoad,
  VImgInput,
  VAvatarUpload,
  Toolbar,
  StickyDrawer
}
