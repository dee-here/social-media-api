const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        max_length: 50,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        max_length: 50,
        // TO DO valid email validation
      },
      thoughts: [ {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },],
      friends: [ {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const User = model('user', userSchema);
  
  module.exports = User;