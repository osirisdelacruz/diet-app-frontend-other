/* eslint-disable no-tabs */
export default {
  data() {
    return {
      birthdateMenu: false,
      customer: {
        firstname: '',
        lastname: '',
        middlename: '',
        gender: '',
        email: '',
        birthdate: ''
      },
      rules: {
        firstname: [
          v => !!v || 'Firstname is required',
          v =>
            (v && v.length >= 3) || "Firstname must be greater than 3 characters"
        ],
        lastname: [
          v => !!v || "Lastname is required",
          v =>
            (v && v.length >= 2) || "Lastname must be greater than 2 characters"
        ],
        email: [
          v => !!v || "E-mail is required",
          v => (v && v.length >= 5) || "E-mail must be greater than 5 characters",
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        gender: [
          v => !!v || "Gender is required",
          v =>
            (!!v && v === 'Male' || v === 'Female') || "Invalid Gender"
        ],
        birthdate: [
          v => !!v || "Birthdate is required",
        ],
      }
    }
  },
  methods: {
    saveBirthdate(date) {
      this.$refs.birthdateMenuRef.save(date)
    },
  },
  watch: {
    birthdateMenu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
}
