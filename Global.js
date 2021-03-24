import { Platform } from "react-native"
import NoDataView from "./screens/NoDataView"


//=================Network=====================//
// global.BASE = "http://36a016bc5613.ngrok.io"
global.BASE = "https://stage.mconnecthealth.com"
//global.BASE = "https://api.mconnecthealth.com"
global.BASE_PATH = `${BASE}/v1/patient`

global.BASE_URL = `${BASE_PATH}/`
global.RAZORPAY_KEY = "rzp_test_pF9ZwXBROCFCP6"

//====================Alerts======================//
global.Alert_Title = "VRCure"
global.SOMETHING_WENT_WRONG = "Something went wrong"
global.NO_DATA_FOUND = "No Data Found"

//===================Colors======================//
global.PRIMARY_COLOR = "#009387"



//=====Notification Service =======================//

import NotificationService from "./screens/NotificationService"

let notificationService = new NotificationService();
global.NotificationService = notificationService

global.FCM_Token = ""


//=================Sizes============
global.HEIGHT_ROW = 45
global.NoDataView = NoDataView
global.ELEVATION = Platform.OS == "ios" ? 1 : 3