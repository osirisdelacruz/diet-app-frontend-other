export default {
    data: () => ({
      doctorObj: {
        code: "",
        carbs: null,
        protein: null,
        fats: null
      },
      rules: {
        doctor: [v => !!v || "Doctor is required"],
        carbs: [v => !!v || "Carbs is required"],
        protein: [v => !!v || "Protein is required"],
        fats: [v => !!v || "Fats is required"]
      }
    }),
    watch: {
      "doctorObj.carbs"() {
        this.completeFatsInput();
      },
      "doctorObj.protein"() {
        this.completeFatsInput();
      }
    },
    methods: {
      completeFatsInput() {
        if (!!this.doctorObj.protein && !!this.doctorObj.carbs) {
          this.doctorObj.fats =
            100 - this.doctorObj.carbs - this.doctorObj.protein
        }
      }
    },
  }