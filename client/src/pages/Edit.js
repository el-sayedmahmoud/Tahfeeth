import React, { useContext, useRef, useState } from "react";
import Spinner from "../components/utilsComponents/Spinner";
import styles from "./edit.module.css";
import ReactCrop, {
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import useCanvasPreview from "../utils/useCanvasPreview";
import BadRequest from "./BadRequest";
import { AuthContext } from "../utils/context";

const data = JSON.parse(localStorage.getItem("data"))
  ? JSON.parse(localStorage.getItem("data"))
  : null;

const ASPECT_RATION = 1;
const MIN_DIMENSION = 150;

function Edit() {
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [modal, setModal] = useState(false);
  // IMAGE CROP
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [imgUrl, setImgUrl] = useState("");
  const [imgError, setImgError] = useState(false);
  const [chosed, setChosed] = useState(false);

  // PASSWORD
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [errPass, setErrPass] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);
  // NAME
  const [username, setUsername] = useState("");
  const [loadingName, setLoadingName] = useState(false);

  const { isLogin } = useContext(AuthContext);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  if (!isLogin) {
    return <BadRequest />;
  }

  const uploadAvatar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("avatar", avatar);
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-production.up.railway.app/user/upload-avatar",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + data?.accessToken,
          },
        }
      );
      if (!response.ok) {
        // console.log(await response.json());
        throw new Error();
      }

      const result = await response.json();

      const userAvatar = result?.user?.avatar;
      const userData = JSON.parse(localStorage.getItem("data"));
      console.log(userData);
      userData.user.avatar = userAvatar;
      const updatedData = JSON.stringify(userData);
      localStorage.setItem("data", updatedData);
      window.location.reload();
    } catch (err) {
      // console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      setLoadingPass(true);
      const res = await fetch(
        "https://tahfeeth-production.up.railway.app/user/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.accessToken,
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        // console.log(result);
        throw new Error(result.error);
      }
      setModal(false);
      setMsg(result.message);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    } catch (err) {
      setErrPass(err.message);
    } finally {
      setLoadingPass(false);
    }
  };

  const updateUsername = async (e) => {
    e.preventDefault();
    try {
      setLoadingName(true);
      const response = await fetch(
        `https://tahfeeth-production.up.railway.app/user/update-username`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.accessToken,
          },
          body: JSON.stringify({
            name: username.trim().length > 0 ? username : null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const updatedData = await response.json();
      // console.log(updatedData);

      const existingData = JSON.parse(localStorage.getItem("data"));
      existingData.user.name = updatedData.name;

      const updatedDataStr = JSON.stringify(existingData);
      localStorage.setItem("data", updatedDataStr);
      window.location.reload();
    } catch (e) {
      setError(true);
    } finally {
      setLoadingName(false);
    }
  };

  const imageCropper = (src) => {
    const file = src;
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageEl = new Image();

      const imageUrl = reader.result?.toString() || "";
      imageEl.src = imageUrl;
      imageEl.addEventListener("load", (e) => {
        const { naturalHeight, naturalWidth } = e.currentTarget;
        setImgError(false);
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          setImgError(true);
          return setImgUrl("");
        }
      });

      setImgUrl(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        // You don't need to pass a complete crop into
        // makeAspectCrop or centerCrop.
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATION,
      width,
      height
    );

    // const s = centerCrop(crop, width, height);

    setCrop(crop);
  }

  return (
    <>
      {modal && (
        <div className={styles.modal} onClick={() => setModal(false)}></div>
      )}
      <div className="absolute left-0 md:mr-8 w-full mb-[11.5rem] md:mb-0 md:w-[80%]  mt-12 flex justify-center flex-col gap-6 items-center">
        <h2 className="text-lg md:text-3xl font-semibold">المعلومات الشخصية</h2>
        <div className="flex flex-col items-center">
          <img
            src={
              data?.user?.avatar ? data?.user?.avatar : "/assets/dummyImage.jpg"
            }
            alt="user img"
            className="rounded-full w-40 h-40 object-cover"
          />
          {avatar && !imgError && (
            <>
              {chosed && (
                <div
                  className="absolute left-0 top-0 w-full h-screen bg-[#000000c0] "
                  onClick={() => setChosed(false)}
                ></div>
              )}
              {chosed && (
                <div className="flex flex-col items-center absolute  bg-slate-600 z-10">
                  <ReactCrop
                    src={URL.createObjectURL(avatar)}
                    crop={crop}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                    circularCrop
                    keepSelection
                    aspect={1}
                    minWidth={MIN_DIMENSION}
                  >
                    <img
                      ref={imgRef}
                      src={imgUrl}
                      alt="upload"
                      onLoad={onImageLoad}
                      className="w-full h-1/2"
                      style={{ maxHeight: "70vh" }}
                    />
                  </ReactCrop>
                </div>
              )}
              {chosed && (
                <button
                  className="z-10 bg-slate-300 py-2 px-4 mt-[27rem]"
                  onClick={() => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useCanvasPreview(
                      imgRef.current, // HTMLImageElement
                      previewCanvasRef.current, // HTMLCanvasElement
                      convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                      )
                    );
                    previewCanvasRef.current.toBlob(async (blob) => {
                      if (blob) {
                        const file = new File([blob], avatar.name, {
                          type: blob.type,
                        });
                        setAvatar(file);
                      }
                    }, "image/jpeg");
                  }}
                >
                  Crop
                </button>
              )}
            </>
          )}
          {crop && chosed && (
            <canvas
              ref={previewCanvasRef}
              className="mt-4 object-contain w-[150px] h-[150px] border border-slate-900 z-10"
            />
          )}

          {error && (
            <p className="mx-auto text-center text-red-600 text-2xl">
              حدث بعض الخطأ
            </p>
          )}
          <div className="flex gap-6 text-2xl justify-center mt-6">
            <button
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2 "
              onClick={() => {
                handleUploadClick();
                setChosed(true);
              }}
            >
              تغيير الصورة
            </button>
          </div>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              imageCropper(e.target.files[0]);
            }}
          />
          {imgError && (
            <p className="text-red-500 text-md">
              Image must be 150 x 150 at least
            </p>
          )}
          {avatar && !imgError && chosed && (
            <>
              <form
                className="flex gap-4 items-center mt-6"
                onSubmit={uploadAvatar}
              >
                <p className="text-2xl font-semibold z-10 block relative bg-white py-2 px-4">
                  أنت اخترت: {avatar.name}
                </p>
                <button
                  type="submit"
                  className="bg-[#9F8565] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md p-2 z-10 text-lg"
                >
                  تأكيد
                </button>
              </form>
            </>
          )}
          {loading && <Spinner />}
        </div>
        <form onSubmit={updateUsername}>
          {loadingName ? (
            <Spinner />
          ) : (
            <h2 className="mx-auto text-2xl text-center mt-6 mb-6">
              {data?.user?.name}
            </h2>
          )}

          <div className="flex items-center justify-center gap-4">
            <input
              type="text"
              placeholder="تغيير الاسم"
              className="rounded-md px-4 py-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2"
            >
              تغيير{" "}
            </button>
          </div>
        </form>
        <button
          className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2"
          onClick={() => setModal((prev) => !prev)}
        >
          تغيير كلمة السر
        </button>
        {msg && <p className="mx-auto text-2xl text-[#43766C]">{msg}</p>}
        {modal && (
          <form
            onSubmit={updatePassword}
            className={`absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
           flex flex-col gap-8 bg-[#ececec] rounded-md py-12 px-4 z-20 w-[80%] md:w-[50%] xl:w-[32rem] items-start justify-start
           ${styles.form}
           
           `}
          >
            <div className="w-full flex flex-wrap items-center justify-center gap-2">
              <label>كلمة السر القديمة</label>
              <input
                className="w-full md:w-2/3 p-2 rounded-md"
                autoFocus
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-wrap items-center justify-center gap-2">
              <label>كلمة السر الجديدة</label>
              <input
                className="w-full md:w-2/3 p-2 rounded-md"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {loadingPass && <Spinner />}
            {errPass && (
              <p className="text-center text-2xl text-red-600 mx-auto">
                {errPass}
              </p>
            )}

            <button
              type="submit"
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2 mx-auto"
            >
              تأكيد
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Edit;
