import React from "react";
import { useEffect, useState } from "react";
import TransactionAttachment from "./TransactionAttachment";
import { useDispatch, useSelector } from "react-redux";
import {
  getLicenseDetailsByLicNo,
  GetLicAddByLicNo,
} from "../store/dashBoardSlice";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

function Content(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { LicenseDetail } = useSelector(
    (state) => state.dashBoard.LicenseDetail
  );
  const { LicenseAddress } = useSelector(
    (state) => state.dashBoard.LicenseAddress
  );

  const {ContractDetails_} = useSelector(state => state.dashBoard.ContractDetails_);


  const { isLoading } = useSelector((state) => state.dashBoard);

  useEffect(() => {
    console.log(props.PortalAlltransactionVw);
    dispatch(GetLicAddByLicNo(props.licenseNo));
    console.log("inside Contenet"+props.ContractDetails);
  }, [dispatch, props.licenseNo]);

  const getTransactions =
    props.PortalAlltransactionVw &&
    props.PortalAlltransactionVw.map((transInfo, index) => (
      <>
        {transInfo.ed_service_category === props.categoryType ? (
          <p className="service_head" key={index}>
            {" "}
            {transInfo.aname}
          </p>
        ) : (
          ""
        )}
      </>
    ));

  /** progress bar start*/
  const [current, setCurrent] = useState(1);
  const [steps, setSteps] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //     console.log('steps', steps);
  //     console.log('current', current);
  //     setProgressBar(steps, current);

  //     const requestNoAfterSave = 'requestNoAfterSave';

  //     if (
  //       requestNoAfterSave !== 'null' &&
  //       requestNoAfterSave !== 'requestNotSaved' &&
  //       requestNoAfterSave !== 'newRequest'
  //     ) {
  //       console.log("inside if");
  //       // Assuming you have a function handleStepChange to handle step change
  //       handleStepChange(2);
  //       swal.close();
  //     } else if (requestNoAfterSave === 'requestNotSaved') {
  //       // Assuming you have a function openErrorDiv to open error div
  //       openErrorDiv();
  //       swal.close();
  //     }
  //     swal.close();
  //   }, [current, steps]); // Include dependencies if needed

  const setProgressBar = (steps, curStep) => {
    const percent = parseFloat((100 / steps) * curStep).toFixed();
    document.querySelector(".progress-bar").style.width = percent + "%";
    document.querySelectorAll("#progressbar li").forEach((li, index) => {
      li.style.width = "50%";
      if (index < curStep) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  };

  const handleStepChange = (newStep) => {
    setCurrent(newStep);
    setProgressBar(steps, newStep);
  };

  const openErrorDiv = () => {
    const result =
      '<h3 style="text-align: center;margin-top: 50px;color:red;">msgErrInSave</h3>';
    document.querySelector(".errorViewPopupfieldgroup").innerHTML = result;
    // Assuming you have a state for error modal visibility, setErrorModalVisible
    // And a function to handle modal visibility, setModalVisible
    setModalVisible(true);
  };

  /**progress bar end */
  const [dataFromChild, setDataFromChild] = useState([]);

  const handleDataFromChildInParent = (data) => {
    setDataFromChild(data);
    // Pass data further up to Grandparent
    props.onDataFromChild(data);
    console.log("data from child " + dataFromChild);
  };

  const formatDate = (isoDateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };



  const licenceData=LicenseDetail &&
  LicenseDetail.map((licInfo, index) => (
    <div className="service_body_item" key={index}>
      <a
        className="toggle_btn"
        data-bs-toggle="collapse"
        href="#service_procedure"
        role="button"
        aria-expanded="true"
        aria-controls="service_procedure"
      >
        إجراءات الخدمة
        <i className="fa-regular fa-chevron-down"></i>
      </a>
      <div className="collapse show" id="service_procedure">
        <div className="card card-body">
          <div className="row gx-0 cotent-section">
            <div className="col-12 p-0 smart-form-container">
              <form id="smartFormId">
                <div id="myRadioGroup">
                  <div className="desc">
                    <div className="col-12 heading text-center fadeInUp wow">
                      {/* <h4>Industrial license holders</h4> */}
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="requestDateIdR"
                            className=" control-label required"
                          >
                            {t("pai-request-date")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            placeholder="request Date"
                            name="request_date"
                            id="requestDateIdR"
                            value={formatDate(new Date())}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="licenseNoIdR"
                            className=" control-label required"
                          >
                            {t("pai-license-no")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="license_number"
                            id="licenseNoIdR"
                            placeholder="License Number"
                            value={licInfo.LICENSE_NUMBER_IF}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label
                            htmlFor="ownerNameIdR"
                            className=" control-label required"
                          >
                            {t("pai-owner-name")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="Owner_Name"
                            id="ownerNameIdR"
                            placeholder="Owner Name"
                            value={licInfo.COMPANY_NAME}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>
                    <div className="row">
                      <div className="col-12"></div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="purposeIdR"
                            className=" control-label required"
                          >
                            {t("pai-purpose-lp")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="Purpose_license_plot"
                            id="purposeIdR"
                            placeholder="Purpose of the license - plot"
                            value={licInfo.PRODUCTION_KIND}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="civilIdR"
                            className=" control-label "
                          >
                            {t("pai-civil-id")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="civil_id"
                            value={licInfo.CIVIL_ID_NR}
                            id="civilIdR"
                            placeholder="Civil Id"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="phoneNoIdR"
                            className=" control-label "
                          >
                            {t("pai-telephone-num")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="phone_number"
                            value={licInfo.TELEPHONE_NR}
                            id="phoneNoIdR"
                            placeholder="Phone Number"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="faxNumberIdR"
                            className=" control-label"
                          >
                            {t("pai-fax")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="fax_number"
                            value={licInfo.FAX_NO}
                            id="faxNumberIdR"
                            placeholder="fax Number"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="pai-start-date"
                            className=" control-label "
                          >
                            {t("pai-start-date")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="pai-start-date"
                            value={
                              licInfo.LICENSE_SDT &&
                              formatDate(licInfo.LICENSE_SDT)
                            }
                            id="pai-start-date"
                            placeholder={t("pai-start-date")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="pai-end-date"
                            className=" control-label "
                          >
                            {t("pai-end-date")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="pai-end-date"
                            value={
                              licInfo.LICENSE_EDT &&
                              formatDate(licInfo.LICENSE_EDT)
                            }
                            id="pai-end-date"
                            placeholder={t("pai-end-date")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h3>{t("pai-placed-in")}</h3>
                        </div>
                      </div>

                      <div className="col-12 table-responsive company-internal-table">
                        <table className="table dataTable no-footer">
                          <thead>
                            <tr>
                              <th className="sorting sorting_desc text-center bg-blue-light">
                                منطقه
                              </th>
                              <th className="sorting sorting_desc text-center bg-blue-light">
                                قطعه
                              </th>
                              <th className="sorting sorting_desc text-center bg-blue-light">
                                قسيمه
                              </th>
                            </tr>
                          </thead>
                          <tbody className=" ">
                            {LicenseAddress &&
                              LicenseAddress.map(
                                (licAdress, idex) => (
                                  <tr key={idex}>
                                    <td>
                                      {licAdress.AREA_DESC_TX}
                                    </td>

                                    <td>{licAdress.BLOCK_NO}</td>
                                    <td>{licAdress.PLOT_NR}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>

                      <div className="h-25 p-5"> </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  
  const contractData=ContractDetails_&&ContractDetails_.map((licInfo, index) => (
    
    <div className="service_body_item" key={index}>
      <a
        className="toggle_btn"
        data-bs-toggle="collapse"
        href="#service_procedure"
        role="button"
        aria-expanded="true"
        aria-controls="service_procedure"
      >
        إجراءات الخدمة
        <i className="fa-regular fa-chevron-down"></i>
      </a>
      <div className="collapse show" id="service_procedure">
        <div className="card card-body">
          <div className="row gx-0 cotent-section">
            <div className="col-12 p-0 smart-form-container">
              <form id="smartFormId">
                <div id="myRadioGroup">
                  <div className="desc">
                    <div className="col-12 heading text-center fadeInUp wow">
                      {/* <h4>Industrial license holders</h4> */}
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="requestDateIdR"
                            className=" control-label required"
                          >
                            {t("pai-request-date")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            placeholder="request Date"
                            name="request_date"
                            id="requestDateIdR"
                            value={formatDate(new Date())}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="licenseNoIdR"
                            className=" control-label required"
                          >
                            {t("pai-customer_no")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="license_number"
                            id="licenseNoIdR"
                            placeholder="License Number"
                            value={licInfo.CONTRACT_ACCOUNT_NO}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label
                            htmlFor="ownerNameIdR"
                            className=" control-label required"
                          >
                            {t("pai-name")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="Owner_Name"
                            id="ownerNameIdR"
                            placeholder="Owner Name"
                            value={licInfo.CONTRACT_PAYEE_NAME}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>
                    <div className="row">
                      <div className="col-12"></div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="purposeIdR"
                            className=" control-label required"
                          >
                            {t("pai-contract-nature")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="Purpose_license_plot"
                            id="purposeIdR"
                            placeholder="Purpose of the license - plot"
                            value={licInfo.CONTRACT_NATURE_DESC_AR}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="civilIdR"
                            className=" control-label "
                          >
                            {t("pai-contract_type")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="civil_id"
                            value={licInfo.CONTRACT_TYPE_DESC_AR}
                            id="civilIdR"
                            placeholder="Civil Id"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="phoneNoIdR"
                            className=" control-label "
                          >
                            {t("pai-telephone-num")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="phone_number"
                            value={licInfo.CONTRACT_TELE_NO_1}
                            id="phoneNoIdR"
                            placeholder="Phone Number"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="faxNumberIdR"
                            className=" control-label"
                          >
                            {t("pai-fax")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="fax_number"
                            value={licInfo.CONTRACT_FAX_NO}
                            id="faxNumberIdR"
                            placeholder="fax Number"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="pai-start-date"
                            className=" control-label "
                          >
                            {t("pai-start-date")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="pai-start-date"
                            value={
                              licInfo.CONTRACT_START_DATE &&
                              formatDate(licInfo.CONTRACT_START_DATE)
                            }
                            id="pai-start-date"
                            placeholder={t("pai-start-date")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label
                            htmlFor="pai-end-date"
                            className=" control-label "
                          >
                            {t("pai-end-date")}
                          </label>
                          <input
                            type="text"
                            className="field form-control effect form-control"
                            name="pai-end-date"
                            value={
                              licInfo.CONTRACT_END_DATE &&
                              formatDate(licInfo.CONTRACT_END_DATE)
                            }
                            id="pai-end-date"
                            placeholder={t("pai-end-date")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h3>{t("pai-placed-in")}</h3>
                        </div>
                      </div>

                      <div className="col-12 table-responsive company-internal-table">
                        <table className="table dataTable no-footer">
                          <thead>
                            <tr>
                              <th className="sorting sorting_desc text-center bg-blue-light">
                                منطقه
                              </th>
                              <th className="sorting sorting_desc text-center bg-blue-light">
                                قطعه
                              </th>
                              <th className="sorting sorting_desc text-center bg-blue-light">
                                قسيمه
                              </th>
                            </tr>
                          </thead>
                          <tbody className=" ">
                            {ContractDetails_ &&
                              ContractDetails_.map(
                                (licAdress, idex) => (
                                  <tr key={idex}>
                                    <td>
                                      {licAdress.AREA_DESC_TX}
                                    </td>

                                    <td>{licAdress.BLOCK_NO}</td>
                                    <td>{licAdress.PLOTS}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>

                      <div className="h-25 p-5"> </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="col-xl-8 col-lg-7 service_content">
        <div className="header_wrapper">
          <div className="service_header">
            <div className="service_name industrial_image">
              <p>خدمات صناعية</p>
            </div>
            <div className="status">
              <ul className="mb-0">
                <li className="online">متصل</li>
                <li className="offline d-none">غير متصل على الانترنت</li>
              </ul>
            </div>
          </div>
          {getTransactions}
        </div>
        {isLoading ? (
          <div>A moment please...</div>
        ) : (
          <>
            <ul id="progressbar">
              <li className="active" id="account">
                <strong></strong>
              </li>
              <li id="personal">
                <strong></strong>
              </li>
            </ul>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="service_body">
              {licenceData?licenceData: contractData}

              <TransactionAttachment
                onDataFromChild={handleDataFromChildInParent}
                transactionId={props.transactionId}
                licenseNo={props.licenseNo}
                type={props.type}
                categoryType={props.categoryType}
                userProfile={props.userProfile}
                isUserProfileLoading={props.isUserProfileLoading}
                userId={props.userId}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Content;
