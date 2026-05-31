import {
  removeNotif,
  NOTIF_PENDING_ID,
  NOTIF_RESULT_ID,
  toast
} from "./core.mjs";

removeNotif(NOTIF_PENDING_ID);
removeNotif(NOTIF_RESULT_ID);
toast("NeuroClip ditutup.");
