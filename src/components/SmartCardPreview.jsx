import React, { useEffect, useState } from "react";
import frontbg from "../assets/images/smartcard/bg.jpg";
import header from "../assets/images/smartcard/header.jpg";
import leftHeader from "../assets/images/smartcard/leftHeader.png";
import rightHeader from "../assets/images/smartcard/rightHeader.png";
import sign from "../assets/images/smartcard/sign.png";
import degree from "../assets/images/smartcard/degree2.png";
import profile from "../assets/images/smartcard/profile2.jpg";

import { QRCodeSVG } from "qrcode.react";
import { Avatar, Button, Modal } from "flowbite-react";
import html2canvas from "html2canvas";
import { PRIMARY_COLOR } from "./../constant";
import config from "../config/config";

const SmartCardPreview = ({
  user,
  frontImage,
  setFrontImage,
  backImage,
  setBackImage,
  downloadImage,
}) => {
  return (
    <div className="bg-primary  px-5 py-3  pb-3 rounded-lg">
      <div className="flex flex-row items-center justify-between ">
        <p className="my-4 text-2xl font-bold text-white">Smartcard ပုံ</p>{" "}
        <Button
          className="bg-white  mb-3 enabled:hover:bg-[#f5f5f5] text-primary focus:ring-primary m-4"
          onClick={downloadImage}
        >
          Download Smartcard
        </Button>
      </div>
      <div className="flex  items-center flex-col gap-5 my-3 smart-card">
        <h1 className="text-white">ရှေ့ခြမ်း</h1>
        <SmartCardFrontView
          user={user}
          frontImage={frontImage}
          setFrontImage={setFrontImage}
        />
        <h1 className="text-white">နောက်ခြမ်း</h1>
        <SmartCardBackView
          id={user.id}
          backImage={backImage}
          setBackImage={setBackImage}
        />
      </div>
    </div>
  );
};
const SmartCardFrontView = ({ user, frontImage, setFrontImage }) => {
  //create div and transform it to image first in the background process and then show the image in preview
  const transformToimg = () => {
    const cardFront = document.getElementById("card-front");
    html2canvas(cardFront, {
      allowTaint: true,
      useCORS: true,

      backgroundColor: "rgba(0,0,0,0)",
    }).then((canvas) => {
      setFrontImage(canvas.toDataURL("image/jpeg"));
    });
  };
  useEffect(() => {
    transformToimg();
  }, []);
  if (!user) return;
  if (frontImage) {
    return <img src={frontImage} className="rounded-lg w-[500px]" />;
  } else {
    return (
      <div
        id="card-front"
        style={{ backgroundImage: `url(${frontbg})` }}
        className="rounded-lg w-[1020px] h-[653px] bg-no-repeat bg-cover  mx-auto absolute z-[-100]"
        // top-0 left-0
      >
        <div
          className="w-full h-full absolute top-0 left-0 z-[2] opacity-100 bg-white"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 17%, rgba(251,251,251,0.50) 68%)",
          }}
        />
        <div className="w-full flex flex-row gap-3 rounded-t-lg items-center justify-center  pt-5 pb-3 px-20 relative z-[5]">
          <img
            onLoad={transformToimg}
            src={leftHeader}
            width={"70px"}
            className="h-[70px]"
          />
          <img src={header} width={"700px"} height={"70px"} className=" " />
          <img
            onLoad={transformToimg}
            src={rightHeader}
            width={"70px"}
            className="h-[70px] "
          />
        </div>

        <div className="bg-cover flex flex-col gap-3  bg-no-repeat rounded-b-lg relative bg-bottom justify-center   w-full ">
          <div className="flex flex-row justify-between  items-center relative z-[5] ">
            <div
              className="flex flex-col w-[665px] justify-between gap-[100px] "
              style={{
                textShadow:
                  "white 1px 0px 0px, white -1px 0px, white 0 1px, white 0 -1px",
              }}
            >
              {/* <div></div> */}
              <div className="flex flex-col ps-[30px] text-[32px] gap-[1.5rem] font-medium">
                <div className="flex flex-row items-start">
                  <p className="smartCardKey">အမည်</p>
                  <p className="flex-1"> - {user.username}</p>
                </div>
                <div className="flex flex-row items-start">
                  <p className="smartCardKey">အဘအမည်</p>
                  <p className="flex-1"> - {user.father_name}</p>
                </div>
                <div className="flex flex-row items-start">
                  <p className="smartCardKey">မွေးသက္ကရာဇ်</p>
                  <p className="flex-1"> - {user.birth_date}</p>
                </div>
                <div className="flex flex-row items-start">
                  <p className="smartCardKey">မှတ်ပုံတင်အမှတ်</p>
                  <p className="flex-1 w-[460px]">{` - ${user.nrc?.full_nrc}`}</p>
                </div>
                {/* <div className="flex flex-row items-start">
                  <p className="smartCardKey">ဖုန်းနံပါတ်</p>
                  <p className="flex-1"> - {user.contact_ph}</p>
                </div> */}
              </div>
              {/* <span className="text-[25px] font-bold ps-[20px] ">
                {String(user?.id).padStart(5, 0)}
              </span> */}
            </div>

            <div className="flex flex-col gap-5 flex-grow-1 py-[40px] justify-center items-center  pe-[30px]">
              <img
                src={`/public/${user?.profile_url}`}
                className="w-[201px] h-[205px] shadow-lg"
              />
              <img src={sign} className="w-[150px]" />
              <img src={degree} alt="" className="w-[300px]" />
              {/* <div
                className="text-[16px] font-medium text-center flex flex-col"
                style={{
                  textShadow:
                    "white 1px 0px 0px, white -1px 0px, white 0 1px, white 0 -1px",
                }}
              >
                <span>ဘဒ္ဒန္တ ဝိစာရ</span>
                <span>ပဓာန နာယကဆရာတော်</span>
                <span>ပုညာရာမ မိုးကုတ်ဝိပဿနာကျောင်းတိုက်</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
const SmartCardBackView = ({ id, backImage, setBackImage }) => {
  const transformToimg = () => {
    const cardback = document.getElementById("card-back");
    html2canvas(cardback, {
      allowTaint: true,
      useCORS: true,

      backgroundColor: "rgba(0,0,0,0)",
    }).then((canvas) => {
      setBackImage(canvas.toDataURL("image/jpeg"));
    });
  };
  useEffect(() => {
    transformToimg();
  }, []);
  if (backImage) {
    return (
      <img
        src={backImage}
        className="rounded-lg w-[500px] border-[1px] border-white"
      />
    );
  } else {
    return (
      <div
        id="card-back"
        className="bg-[#453315]  min-w-[1020px] h-[653px] bg-no-repeat  text-white  flex flex-col items-center justify-center rounded-lg absolute z-[-100] "
      >
        <div className="flex flex-col mt-[-30px]">
          <div className="text-[35px] font-bold ps-5 mb-10">
            စည်းကမ်းချက်များ
          </div>
          <div className="flex items-center  ps-8 ">
            <div className="text-[22px] max-w-[700px] gap-5 font-medium flex flex-col">
              <div className="flex flex-row ">
                <span className="me-1"> ၁။</span>
                တာဝန်ရှိသူများ၏သတိပေးခြင်း (၂)ကြိမ်ထက်ကျော်လွန်ပါက
                မိမိအသိနှင့်ကဒ်ပြန်လည်အပ်နှံ၍ ရိပ်သာမှထွက်ရပါမည်။
              </div>
              <div className="flex flex-row">
                <span className="me-1"> ၂။</span>{" "}
                <span>
                  တရားစခန်းဝင်ရောက်တိုင်း နေ့လည်(၂)နာရီမှကြွရောက်ရပါမည်။
                </span>
              </div>
              <div className="flex flex-row">
                <span className="me-1"> ၃။</span>
                <span>
                  ကဒ်ရှိပြီးသားယောဂီများ အချက်အလက်စုံလင်စွာဖြင့်
                  အင်္ဂလိပ်လဆန်း(၁)ရက်မှ(၁၀)ရက်အတွင်း စာရင်းပေးသွင်းနိုင်ပါသည်။
                </span>
              </div>
              <div className="flex flex-row">
                <span className="me-1"> ၄။</span>
                <span>
                  ဖုန်းများ <b>လုံးဝ</b> ယူဆောင်လာခြင်းမပြုရပါ၊ ယူလာပါက
                  ခေတ္တသိမ်းပါမည်၊ တရားစခန်းထွက်သောနေ့တွင်ပြန်လည်ထုတ်ယူရန်။
                </span>
              </div>
              <div className="flex flex-row">
                <span className="me-1"> ၅။</span>
                <span>
                  ကဒ်ပျောက်ပျက်ပါက ကျောင်းတိုက်သို့ ကိုယ်တိုင်လာရောက်
                  အသစ်စာရင်းသွင်းရပါမည်။
                </span>
              </div>
            </div>

            <div className="max-w-[300px] w-[300px] p-5 flex flex-col items-center justify-center">
              <QRCodeSVG
                value={config.appUrl + `yawgi/${String(id)}`}
                size="200"
                fgColor="#372404"
              />
              <span className="text-[25px] font-bold ">
                PNRM-{String(id).padStart(5, 0)}
              </span>
            </div>
          </div>
          <hr className="w-full h-2 border-white my-3 mt-10" />
          <div className="flex flex-col gap-1 ps-5 text-[20px]">
            <span>
              <b>ကျောင်းတိုက်လိပ်စာ</b> - နဝရတ်(၃)လမ်းထိပ်၊ (၉)ရပ်ကွက်၊
              သာကေတမြို့နယ်၊ ရန်ကုန်မြို့။
            </span>
            <span>
              <b>ဖုန်းနံပါတ်</b> - ၀၉ ၄၂၈၅၁၅၁၃၉။
            </span>
          </div>
        </div>
      </div>
    );
  }
};
export default SmartCardPreview;
