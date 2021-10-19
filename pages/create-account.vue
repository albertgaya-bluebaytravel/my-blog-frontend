<template>
  <div class="container mt-5">
    <div class="offset-3 col-6">
      <b-card header="Create Account">
        <b-form>
          <b-form-group label="Name" label-for="name">
            <b-form-input
              id="name"
              name="name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              name="email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input
              id="password"
              name="password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Confirm Password"
            label-for="password_confirmation"
          >
            <b-form-input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <div>
            <b-button type="submit" variant="primary" class>Submit</b-button>

            <nuxt-link to="/login" class="float-right mt-2">
              Already have an account?
            </nuxt-link>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'none',
}
</script>