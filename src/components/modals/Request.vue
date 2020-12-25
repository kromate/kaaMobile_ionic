<template>
  <transition name="slide" appear>
    <div class="modal">
      <div class="modal_box">
        <form action="" name="submit-to-google-sheet" style="padding: 10%;" class="fadeRight">
          <div>
            <label for="name">Name</label>
            <input id="name" name="Name" type="text" placeholder="Enter Your Full Name" required />
          </div>

          <div>
            <label for="email">Email</label>
            <input id="email" name="Email" type="email" placeholder="Enter Your Email" required />
          </div>

          <div>
            <label for="phone">Phone Num</label>
            <input id="phone" name="Phone" type="text" placeholder="WhatsApp Prefered" required />
          </div>

          <div style=" margin-bottom: 4px;">
            <label for="">University</label>
            <select name="University" required style="display: block;">
              <option value="" disabled selected>Select Your University</option>
              <option value="Unilag">University of Lagos</option>
            </select>
          </div>

          <div style=" margin-bottom: 4px;">
            <label for="">Faculty</label>
            <select name="Faculty" required style="display: block;">
              <option value="" disabled selected>Select Your Faculty</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          <div>
            <label for="dept">Department</label>
            <input
              id="dept"
              name="Department"
              type="text"
              placeholder="Enter Your Department"
              required
            />
          </div>

          <!-- <div style=" margin-bottom: 8px;">
            <label for="">Group</label>
            <select name="Group" id="group" required style="display: block;">
              <option value="" disabled selected>Select Your Group</option>
              <option value="Dev">Developers</option>
              <option value="Aca">Academics</option>
              <option value="Com">Community</option>
            </select>
          </div> -->

          <button class="custom-btn" style="border:2px solid; margin-top:1rem;" @click="submit">
            Sumbit
          </button>

          <button
            class="custom-btn"
            style="border:2px solid; margin-top:1rem;"
            @click="$emit('close')"
          >
            close
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Request",
  data() {
    return {
      submitBtn: "false",
    };
  },
  methods: {
    submit() {
      console.log("object");
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyZQwmc5BwXCDM8tlR5MU1bkN7-2tcSIiKctGQHjdJ0xJECo7HM/exec";
      const form = document.forms["submit-to-google-sheet"];
      console.log(form);
      form.addEventListener("submit", () => {
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then(() => {
            this.$emit("close");
          })
          .catch((error) => alert("Error!", error.message));
      });
    },
  },
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
  background-color: grey;
}
form > div {
  overflow: hidden;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #748194;
}
input {
  height: 35px;
  width: 214px;
  padding: 6px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #dddfe2;
  color: #3f4753;
  font-size: 14px;
  font-weight: bold;
}
select {
  height: 45px;
  width: 244px;
  padding: 6px 15px;
  border-radius: 5px;
  outline: none;
  border: none;
  background: #dddfe2;
  color: #3f4753;
  font-size: 14px;
  font-weight: bold;
}
label {
  display: block;
  font-size: 18px;
  padding: 5px 0px;
}
button {
  color: #1b4974 !important;
}
.modal_box {
  background-color: #fff;
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 84vw;
  max-width: 480px;
  min-height: 185px;
  max-height: 90vh;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 99;
  width: 100%;
  height: 100%;
  max-width: 100%;
  background-color: rgb(0, 0, 0, 0.25);
  border: 1px solid #6c63ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: scale(0);
}</style
>>
