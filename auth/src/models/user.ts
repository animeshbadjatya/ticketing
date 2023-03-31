import mongoose from "mongoose";
import { PasswordsManager } from "../services/passwordManager";

//An interface to define the schema for the database table User.
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties that the User model have
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties of the User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
        },
    password: {
        type: String,
        required: true
        }
    },{
        toJSON: { transform(doc, ret) {
            ret.id =  ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

    userSchema.pre('save', async function(next: Function) {
        const user = this;
        if (user.isModified('password')) {
            const hashed = await PasswordsManager.toHash(user.get('password'));
            user.set('password',hashed);
        }
        next();
    });

    userSchema.statics.build = function(attrs: UserAttrs){
    console.log('attrs : ',attrs);
    console.log( 'User crreator called new User(attrs) ');
    return new User(attrs);
}
    

const User =   mongoose.model<UserDoc, UserModel>("User", userSchema);


// const buildUser =  (email: string, password: string) => {
    // const user = new User({
        // email,
        // password
    // });
    // return user;
// }

// const buildUser = (attrs: UserAttrs) => {
    //  console.log('attrs : ',attrs);
    // return new User(attrs);
// };

// buildUser({
//    email: "lyhxr@example.com",
 //  yoemail: "lyhxr@example.com", // you can add a property and mongoose will let you add this property, however we shouldn't allow that. Hence we use Typescript instead.
     // password : "123456" //spelling check also done by typescript.
// }); //


// const user = User.build({
    // email: "lyhxr@example.com",
    // password: "123456"
// });
export {User};