/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import View from "@/store/view";
import Auth from "~/store/auth";
import Profile from "~/store/users/profile";
import Error from "~/store/error";
import Avatar from "~/store/users/avatar";
import Register from "~/store/register";
import ForgotPassword from "~/store/forgotPassword";
import Conversation from "~/store/conversations";
import Friend from "~/store/friends/main";

let view: View;
let auth: Auth;
let profile: Profile;
let error: Error;
let avatar: Avatar;
let register: Register;
let forgotPassword: ForgotPassword;
let conversation: Conversation;
let friend: Friend;

const initializeStores = (store: Store<any>): void => {
  view = getModule(View, store);
  auth = getModule(Auth, store);
  profile = getModule(Profile, store);
  error = getModule(Error, store);
  avatar = getModule(Avatar, store);
  register = getModule(Register, store);
  forgotPassword = getModule(ForgotPassword, store);
  conversation = getModule(Conversation, store);
  friend = getModule(Friend, store);
};

export {
  initializeStores,
  view,
  auth,
  profile,
  error,
  avatar,
  register,
  forgotPassword,
  conversation,
  friend,
};
