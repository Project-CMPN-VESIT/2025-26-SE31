import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    phone: String,

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    profileImage: String,

    address: {
        type: String,
        default: ""
    },

    donations: [
        {
            amount: Number,
            date: { type: Date, default: Date.now }
        }
    ],

    emailVerificationToken: {
        type: String
    },
    emailVerificationExpires: {
        type: Date
    }

}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error;
    }
});

// password verify karayla
userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//generate email token 
userSchema.methods.generateEmailVerificationToken = function () {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    this.emailVerificationToken = hashedToken;
    this.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 min

    return token;
};


export default mongoose.model('User', userSchema);