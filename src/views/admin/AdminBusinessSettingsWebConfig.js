import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import React from "react";

function AdminBusinessSettingsWebConfig() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <AdminDashboardBreadCrumb />
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Website Info{" "}
            </li>
          </ol>
        </nav>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-md-12 mb-3 mt-3">
            <div className="alert alert-danger mb-3" role="alert">
              Changing some settings will take time to show effect please clear
              session or wait for 60 minutes else browse from incognito mode
            </div>
            <div className="card">
              <div className="card-body" style={{ paddingBottom: "12px" }}>
                <div className="row flex-between mx-1">
                  <div className="flex-between">
                    <h5 className="mr-1">
                      <i className="tio-settings-outlined" />
                    </h5>
                    <h5>Maintenance mode</h5>
                  </div>
                  <div>
                    <label className="switch ml-3 float-right">
                      <input
                        type="checkbox"
                        className="status"
                        onclick="maintenance_mode()"
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row col-12">
            <div className="col-12 col-md-5 mb-1">
              <div className="card">
                <div className="card-header">
                  <h5 className="text-center">
                    <i className="tio-money" /> Currency Symbol Position
                  </h5>
                  <i className="tio-dollar" />
                </div>
                <div className="card-body">
                  <div className="form-row">
                    <div className="col-sm mb-2 mb-sm-0">
                      <div className="form-control">
                        <div
                          className="custom-control custom-radio custom-radio-reverse"
                          onclick="currency_symbol_position('https://6valley.6amtech.com/admin/business-settings/web-config/currency-symbol-position/left')"
                        >
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="projectViewNewProjectTypeRadio"
                            id="projectViewNewProjectTypeRadio1"
                          />
                          <label
                            className="custom-control-label media align-items-center"
                            htmlFor="projectViewNewProjectTypeRadio1"
                          >
                            <i className="tio-agenda-view-outlined text-muted mr-2" />
                            <span className="media-body">$ Left</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm mb-2 mb-sm-0">
                      <div className="form-control">
                        <div
                          className="custom-control custom-radio custom-radio-reverse"
                          onclick="currency_symbol_position('https://6valley.6amtech.com/admin/business-settings/web-config/currency-symbol-position/right')"
                        >
                          <input
                            type="radio"
                            className="custom-control-input"
                            name="projectViewNewProjectTypeRadio"
                            id="projectViewNewProjectTypeRadio2"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label media align-items-center"
                            htmlFor="projectViewNewProjectTypeRadio2"
                          >
                            <i className="tio-table text-muted mr-2" />
                            <span className="media-body">Right $</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row col-12">
            <div className="col-12 col-md-6 mb-1">
              <div className="card">
                <div className="card-header">
                  <h5 className="text-center">Apple store Status</h5>
                </div>
                <div className="card-body" style={{ padding: "20px" }}>
                  <form style={{ textAlign: "left" }}>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                    />
                    <div className="form-group mb-2 mt-2">
                      <input
                        type="radio"
                        name="status"
                        defaultValue={1}
                        defaultChecked
                      />
                      <label style={{ paddingLeft: "10px" }}>Active</label>
                      <br />
                    </div>
                    <div className="form-group mb-2">
                      <input type="radio" name="status" defaultValue={0} />
                      <label style={{ paddingLeft: "10px" }}>Inactive</label>
                      <br />
                    </div>
                    <div className="form-group mb-2">
                      <label style={{ paddingLeft: "10px" }}>Link</label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="link"
                        defaultValue="https://www.apple.com/app-store/"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="text-center">Google play store Status</h5>
                </div>
                <div className="card-body" style={{ padding: "20px" }}>
                  <form style={{ textAlign: "left" }}>
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
                    />
                    <div className="form-group mb-2 mt-2">
                      <input
                        type="radio"
                        name="status"
                        defaultValue={1}
                        defaultChecked
                      />
                      <label style={{ paddingLeft: "10px" }}>Active</label>
                      <br />
                    </div>
                    <div className="form-group mb-2">
                      <input type="radio" name="status" defaultValue={0} />
                      <label style={{ paddingLeft: "10px" }}>Inactive</label>
                      <br />
                    </div>
                    <div className="form-group mb-2">
                      <label style={{ paddingLeft: "10px" }}>Link</label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        name="link"
                        defaultValue="https://play.google.com/store/apps"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "10px",
            background: "white",
            borderRadius: "10px",
            textAlign: "left",
          }}
        >
          <h3>Web config Form</h3>
          <form encType="multipart/form-data">
            <input
              type="hidden"
              name="_token"
              defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
            />{" "}
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-md-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <div className="flex-between">
                      <div className="flex-between">
                        <div className="mr-1">
                          <i className="tio-shop" />
                        </div>
                        <h5>Admin Shop Banner</h5>
                      </div>
                      <div className="ml-1">
                        <small style={{ color: "red" }}>Ratio ( 6:1 )</small>
                      </div>
                    </div>
                    <div>
                      <i className="tio-panorama-image" />
                    </div>
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <center>
                      <img
                        height={200}
                        style={{ width: "100%" }}
                        id="viewerShop"
                        src="https://6valley.6amtech.com/storage/app/public/shop/2021-10-29-617bc4bb00c71.png"
                      />
                    </center>
                    <hr />
                    <div className="row pl-4 pr-4">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <input
                          type="file"
                          name="shop_banner"
                          id="customFileUploadShop"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUploadShop"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">Company Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="company_name"
                    defaultValue="6Valley"
                    placeholder="New Business"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">Company Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="company_email"
                    defaultValue="support@6amtech.com"
                    placeholder="New Business"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">Phone</label>
                  <input
                    className="form-control"
                    type="text"
                    name="company_phone"
                    defaultValue="+88017 00000000"
                    placeholder="New Business"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">Latitude</label>
                  <input
                    className="form-control"
                    type="text"
                    name="latitude"
                    defaultValue
                    placeholder="Latitude"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">Longitude</label>
                  <input
                    className="form-control"
                    type="text"
                    name="longitude"
                    defaultValue
                    placeholder="Longitude"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">
                    Minimum stock limit for warning
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="stock_limit"
                    defaultValue={10}
                    placeholder="EX:123"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">Pagination Settings</label>
                  <input
                    type="number"
                    defaultValue={25}
                    name="pagination_limit"
                    className="form-control"
                    placeholder={25}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label text-capitalize">
                    Digit after decimal point ( ex: 0.00)
                  </label>
                  <input
                    type="number"
                    defaultValue={2}
                    name="decimal_point_settings"
                    className="form-control"
                    min={0}
                    placeholder={4}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label">
                    Rename company Copy right Text
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="company_copyright_text"
                    defaultValue="Copyright © 2022 Zambet"
                    placeholder="Company copyright text"
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label d-inline text-capitalize">
                    Time Zone
                  </label>
                  <select
                    name="timezone"
                    className="form-control js-select2-custom select2-hidden-accessible"
                    data-select2-id={1}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <option value="UTC" data-select2-id={3}>
                      UTC
                    </option>
                    <option value="Etc/GMT+12" data-select2-id={4}>
                      (GMT-12:00) International Date Line West
                    </option>
                    <option value="Pacific/Midway" data-select2-id={5}>
                      (GMT-11:00) Midway Island, Samoa
                    </option>
                    <option value="Pacific/Honolulu" data-select2-id={6}>
                      (GMT-10:00) Hawaii
                    </option>
                    <option value="US/Alaska" data-select2-id={7}>
                      (GMT-09:00) Alaska
                    </option>
                    <option value="America/Los_Angeles" data-select2-id={8}>
                      (GMT-08:00) Pacific Time (US &amp; Canada)
                    </option>
                    <option value="America/Tijuana" data-select2-id={9}>
                      (GMT-08:00) Tijuana, Baja California
                    </option>
                    <option value="US/Arizona" data-select2-id={10}>
                      (GMT-07:00) Arizona
                    </option>
                    <option value="America/Chihuahua" data-select2-id={11}>
                      (GMT-07:00) Chihuahua, La Paz, Mazatlan
                    </option>
                    <option value="US/Mountain" data-select2-id={12}>
                      (GMT-07:00) Mountain Time (US &amp; Canada)
                    </option>
                    <option value="America/Managua" data-select2-id={13}>
                      (GMT-06:00) Central America
                    </option>
                    <option value="US/Central" selected data-select2-id={14}>
                      (GMT-06:00) Central Time (US &amp; Canada)
                    </option>
                    <option value="America/Mexico_City" data-select2-id={15}>
                      (GMT-06:00) Guadalajara, Mexico City, Monterrey
                    </option>
                    <option value="Canada/Saskatchewan" data-select2-id={16}>
                      (GMT-06:00) Saskatchewan
                    </option>
                    <option value="America/Bogota" data-select2-id={17}>
                      (GMT-05:00) Bogota, Lima, Quito, Rio Branco
                    </option>
                    <option value="US/Eastern" data-select2-id={18}>
                      (GMT-05:00) Eastern Time (US &amp; Canada)
                    </option>
                    <option value="US/East-Indiana" data-select2-id={19}>
                      (GMT-05:00) Indiana (East)
                    </option>
                    <option value="Canada/Atlantic" data-select2-id={20}>
                      (GMT-04:00) Atlantic Time (Canada)
                    </option>
                    <option value="America/Caracas" data-select2-id={21}>
                      (GMT-04:00) Caracas, La Paz
                    </option>
                    <option value="America/Manaus" data-select2-id={22}>
                      (GMT-04:00) Manaus
                    </option>
                    <option value="America/Santiago" data-select2-id={23}>
                      (GMT-04:00) Santiago
                    </option>
                    <option value="Canada/Newfoundland" data-select2-id={24}>
                      (GMT-03:30) Newfoundland
                    </option>
                    <option value="America/Sao_Paulo" data-select2-id={25}>
                      (GMT-03:00) Brasilia
                    </option>
                    <option
                      value="America/Argentina/Buenos_Aires"
                      data-select2-id={26}
                    >
                      (GMT-03:00) Buenos Aires, Georgetown
                    </option>
                    <option value="America/Godthab" data-select2-id={27}>
                      (GMT-03:00) Greenland
                    </option>
                    <option value="America/Montevideo" data-select2-id={28}>
                      (GMT-03:00) Montevideo
                    </option>
                    <option value="America/Noronha" data-select2-id={29}>
                      (GMT-02:00) Mid-Atlantic
                    </option>
                    <option value="Atlantic/Cape_Verde" data-select2-id={30}>
                      (GMT-01:00) Cape Verde Is.
                    </option>
                    <option value="Atlantic/Azores" data-select2-id={31}>
                      (GMT-01:00) Azores
                    </option>
                    <option value="Africa/Casablanca" data-select2-id={32}>
                      (GMT+00:00) Casablanca, Monrovia, Reykjavik
                    </option>
                    <option value="Etc/Greenwich" data-select2-id={33}>
                      (GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh,
                      Lisbon, London
                    </option>
                    <option value="Europe/Amsterdam" data-select2-id={34}>
                      (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm,
                      Vienna
                    </option>
                    <option value="Europe/Belgrade" data-select2-id={35}>
                      (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana,
                      Prague
                    </option>
                    <option value="Europe/Brussels" data-select2-id={36}>
                      (GMT+01:00) Brussels, Copenhagen, Madrid, Paris
                    </option>
                    <option value="Europe/Sarajevo" data-select2-id={37}>
                      (GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb
                    </option>
                    <option value="Africa/Lagos" data-select2-id={38}>
                      (GMT+01:00) West Central Africa
                    </option>
                    <option value="Asia/Amman" data-select2-id={39}>
                      (GMT+02:00) Amman
                    </option>
                    <option value="Europe/Athens" data-select2-id={40}>
                      (GMT+02:00) Athens, Bucharest, Istanbul
                    </option>
                    <option value="Asia/Beirut" data-select2-id={41}>
                      (GMT+02:00) Beirut
                    </option>
                    <option value="Africa/Cairo" data-select2-id={42}>
                      (GMT+02:00) Cairo
                    </option>
                    <option value="Africa/Harare" data-select2-id={43}>
                      (GMT+02:00) Harare, Pretoria
                    </option>
                    <option value="Europe/Helsinki" data-select2-id={44}>
                      (GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
                    </option>
                    <option value="Asia/Jerusalem" data-select2-id={45}>
                      (GMT+02:00) Jerusalem
                    </option>
                    <option value="Europe/Minsk" data-select2-id={46}>
                      (GMT+02:00) Minsk
                    </option>
                    <option value="Africa/Windhoek" data-select2-id={47}>
                      (GMT+02:00) Windhoek
                    </option>
                    <option value="Asia/Kuwait" data-select2-id={48}>
                      (GMT+03:00) Kuwait, Riyadh, Baghdad
                    </option>
                    <option value="Europe/Moscow" data-select2-id={49}>
                      (GMT+03:00) Moscow, St. Petersburg, Volgograd
                    </option>
                    <option value="Africa/Nairobi" data-select2-id={50}>
                      (GMT+03:00) Nairobi
                    </option>
                    <option value="Asia/Tbilisi" data-select2-id={51}>
                      (GMT+03:00) Tbilisi
                    </option>
                    <option value="Asia/Tehran" data-select2-id={52}>
                      (GMT+03:30) Tehran
                    </option>
                    <option value="Asia/Muscat" data-select2-id={53}>
                      (GMT+04:00) Abu Dhabi, Muscat
                    </option>
                    <option value="Asia/Baku" data-select2-id={54}>
                      (GMT+04:00) Baku
                    </option>
                    <option value="Asia/Yerevan" data-select2-id={55}>
                      (GMT+04:00) Yerevan
                    </option>
                    <option value="Asia/Kabul" data-select2-id={56}>
                      (GMT+04:30) Kabul
                    </option>
                    <option value="Asia/Yekaterinburg" data-select2-id={57}>
                      (GMT+05:00) Yekaterinburg
                    </option>
                    <option value="Asia/Karachi" data-select2-id={58}>
                      (GMT+05:00) Islamabad, Karachi, Tashkent
                    </option>
                    <option value="Asia/Calcutta" data-select2-id={59}>
                      (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
                    </option>
                    <option value="Asia/Katmandu" data-select2-id={60}>
                      (GMT+05:45) Kathmandu
                    </option>
                    <option value="Asia/Almaty" data-select2-id={61}>
                      (GMT+06:00) Almaty, Novosibirsk
                    </option>
                    <option value="Asia/Dhaka" data-select2-id={62}>
                      (GMT+06:00) Astana, Dhaka
                    </option>
                    <option value="Asia/Rangoon" data-select2-id={63}>
                      (GMT+06:30) Yangon (Rangoon)
                    </option>
                    <option value="Asia/Bangkok" data-select2-id={64}>
                      (GMT+07:00) Bangkok, Hanoi, Jakarta
                    </option>
                    <option value="Asia/Krasnoyarsk" data-select2-id={65}>
                      (GMT+07:00) Krasnoyarsk
                    </option>
                    <option value="Asia/Hong_Kong" data-select2-id={66}>
                      (GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi
                    </option>
                    <option value="Asia/Kuala_Lumpur" data-select2-id={67}>
                      (GMT+08:00) Kuala Lumpur, Singapore
                    </option>
                    <option value="Asia/Irkutsk" data-select2-id={68}>
                      (GMT+08:00) Irkutsk, Ulaan Bataar
                    </option>
                    <option value="Australia/Perth" data-select2-id={69}>
                      (GMT+08:00) Perth
                    </option>
                    <option value="Asia/Taipei" data-select2-id={70}>
                      (GMT+08:00) Taipei
                    </option>
                    <option value="Asia/Tokyo" data-select2-id={71}>
                      (GMT+09:00) Osaka, Sapporo, Tokyo
                    </option>
                    <option value="Asia/Seoul" data-select2-id={72}>
                      (GMT+09:00) Seoul
                    </option>
                    <option value="Asia/Yakutsk" data-select2-id={73}>
                      (GMT+09:00) Yakutsk
                    </option>
                    <option value="Australia/Adelaide" data-select2-id={74}>
                      (GMT+09:30) Adelaide
                    </option>
                    <option value="Australia/Darwin" data-select2-id={75}>
                      (GMT+09:30) Darwin
                    </option>
                    <option value="Australia/Brisbane" data-select2-id={76}>
                      (GMT+10:00) Brisbane
                    </option>
                    <option value="Australia/Canberra" data-select2-id={77}>
                      (GMT+10:00) Canberra, Melbourne, Sydney
                    </option>
                    <option value="Australia/Hobart" data-select2-id={78}>
                      (GMT+10:00) Hobart
                    </option>
                    <option value="Pacific/Guam" data-select2-id={79}>
                      (GMT+10:00) Guam, Port Moresby
                    </option>
                    <option value="Asia/Vladivostok" data-select2-id={80}>
                      (GMT+10:00) Vladivostok
                    </option>
                    <option value="Asia/Magadan" data-select2-id={81}>
                      (GMT+11:00) Magadan, Solomon Is., New Caledonia
                    </option>
                    <option value="Pacific/Auckland" data-select2-id={82}>
                      (GMT+12:00) Auckland, Wellington
                    </option>
                    <option value="Pacific/Fiji" data-select2-id={83}>
                      (GMT+12:00) Fiji, Kamchatka, Marshall Is.
                    </option>
                    <option value="Pacific/Tongatapu" data-select2-id={84}>
                      (GMT+13:00) Nuku'alofa
                    </option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id={2}
                    style={{ width: "100%" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection custom-select"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex={0}
                        aria-disabled="false"
                        aria-labelledby="select2-timezone-7v-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-timezone-7v-container"
                          role="textbox"
                          aria-readonly="true"
                          title="(GMT-06:00)
Central Time
(US & Canada)
"
                        >
                          <span>
                            (GMT-06:00) Central Time (US &amp; Canada)
                          </span>
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation" />
                        </span>
                      </span>
                    </span>
                    <span className="dropdown-wrapper" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label d-inline text-capitalize">
                    Country{" "}
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="form-control js-select2-custom select2-hidden-accessible"
                    data-select2-id="country"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <option value="AF" data-select2-id={86}>
                      Afghanistan
                    </option>
                    <option value="AX" data-select2-id={87}>
                      Åland Islands
                    </option>
                    <option value="AL" data-select2-id={88}>
                      Albania
                    </option>
                    <option value="DZ" data-select2-id={89}>
                      Algeria
                    </option>
                    <option value="AS" data-select2-id={90}>
                      American Samoa
                    </option>
                    <option value="AD" data-select2-id={91}>
                      Andorra
                    </option>
                    <option value="AO" data-select2-id={92}>
                      Angola
                    </option>
                    <option value="AI" data-select2-id={93}>
                      Anguilla
                    </option>
                    <option value="AQ" data-select2-id={94}>
                      Antarctica
                    </option>
                    <option value="AG" data-select2-id={95}>
                      Antigua and Barbuda
                    </option>
                    <option value="AR" data-select2-id={96}>
                      Argentina
                    </option>
                    <option value="AM" data-select2-id={97}>
                      Armenia
                    </option>
                    <option value="AW" data-select2-id={98}>
                      Aruba
                    </option>
                    <option value="AU" data-select2-id={99}>
                      Australia
                    </option>
                    <option value="AT" data-select2-id={100}>
                      Austria
                    </option>
                    <option value="AZ" data-select2-id={101}>
                      Azerbaijan
                    </option>
                    <option value="BS" data-select2-id={102}>
                      Bahamas
                    </option>
                    <option value="BH" data-select2-id={103}>
                      Bahrain
                    </option>
                    <option value="BD" data-select2-id={104}>
                      India
                    </option>
                    <option value="BB" data-select2-id={105}>
                      Barbados
                    </option>
                    <option value="BY" data-select2-id={106}>
                      Belarus
                    </option>
                    <option value="BE" data-select2-id={107}>
                      Belgium
                    </option>
                    <option value="BZ" data-select2-id={108}>
                      Belize
                    </option>
                    <option value="BJ" data-select2-id={109}>
                      Benin
                    </option>
                    <option value="BM" data-select2-id={110}>
                      Bermuda
                    </option>
                    <option value="BT" data-select2-id={111}>
                      Bhutan
                    </option>
                    <option value="BO" data-select2-id={112}>
                      Bolivia, Plurinational State of
                    </option>
                    <option value="BQ" data-select2-id={113}>
                      Bonaire, Sint Eustatius and Saba
                    </option>
                    <option value="BA" data-select2-id={114}>
                      Bosnia and Herzegovina
                    </option>
                    <option value="BW" data-select2-id={115}>
                      Botswana
                    </option>
                    <option value="BV" data-select2-id={116}>
                      Bouvet Island
                    </option>
                    <option value="BR" data-select2-id={117}>
                      Brazil
                    </option>
                    <option value="IO" data-select2-id={118}>
                      British Indian Ocean Territory
                    </option>
                    <option value="BN" data-select2-id={119}>
                      Brunei Darussalam
                    </option>
                    <option value="BG" data-select2-id={120}>
                      Bulgaria
                    </option>
                    <option value="BF" data-select2-id={121}>
                      Burkina Faso
                    </option>
                    <option value="BI" data-select2-id={122}>
                      Burundi
                    </option>
                    <option value="KH" data-select2-id={123}>
                      Cambodia
                    </option>
                    <option value="CM" data-select2-id={124}>
                      Cameroon
                    </option>
                    <option value="CA" data-select2-id={125}>
                      Canada
                    </option>
                    <option value="CV" data-select2-id={126}>
                      Cape Verde
                    </option>
                    <option value="KY" data-select2-id={127}>
                      Cayman Islands
                    </option>
                    <option value="CF" data-select2-id={128}>
                      Central African Republic
                    </option>
                    <option value="TD" data-select2-id={129}>
                      Chad
                    </option>
                    <option value="CL" data-select2-id={130}>
                      Chile
                    </option>
                    <option value="CN" data-select2-id={131}>
                      China
                    </option>
                    <option value="CX" data-select2-id={132}>
                      Christmas Island
                    </option>
                    <option value="CC" data-select2-id={133}>
                      Cocos (Keeling) Islands
                    </option>
                    <option value="CO" data-select2-id={134}>
                      Colombia
                    </option>
                    <option value="KM" data-select2-id={135}>
                      Comoros
                    </option>
                    <option value="CG" data-select2-id={136}>
                      Congo
                    </option>
                    <option value="CD" data-select2-id={137}>
                      Congo, the Democratic Republic of the
                    </option>
                    <option value="CK" data-select2-id={138}>
                      Cook Islands
                    </option>
                    <option value="CR" data-select2-id={139}>
                      Costa Rica
                    </option>
                    <option value="CI" data-select2-id={140}>
                      Côte d'Ivoire
                    </option>
                    <option value="HR" data-select2-id={141}>
                      Croatia
                    </option>
                    <option value="CU" data-select2-id={142}>
                      Cuba
                    </option>
                    <option value="CW" data-select2-id={143}>
                      Curaçao
                    </option>
                    <option value="CY" data-select2-id={144}>
                      Cyprus
                    </option>
                    <option value="CZ" data-select2-id={145}>
                      Czech Republic
                    </option>
                    <option value="DK" data-select2-id={146}>
                      Denmark
                    </option>
                    <option value="DJ" data-select2-id={147}>
                      Djibouti
                    </option>
                    <option value="DM" data-select2-id={148}>
                      Dominica
                    </option>
                    <option value="DO" data-select2-id={149}>
                      Dominican Republic
                    </option>
                    <option value="EC" data-select2-id={150}>
                      Ecuador
                    </option>
                    <option value="EG" data-select2-id={151}>
                      Egypt
                    </option>
                    <option value="SV" data-select2-id={152}>
                      El Salvador
                    </option>
                    <option value="GQ" data-select2-id={153}>
                      Equatorial Guinea
                    </option>
                    <option value="ER" data-select2-id={154}>
                      Eritrea
                    </option>
                    <option value="EE" data-select2-id={155}>
                      Estonia
                    </option>
                    <option value="ET" data-select2-id={156}>
                      Ethiopia
                    </option>
                    <option value="FK" data-select2-id={157}>
                      Falkland Islands (Malvinas)
                    </option>
                    <option value="FO" data-select2-id={158}>
                      Faroe Islands
                    </option>
                    <option value="FJ" data-select2-id={159}>
                      Fiji
                    </option>
                    <option value="FI" data-select2-id={160}>
                      Finland
                    </option>
                    <option value="FR" data-select2-id={161}>
                      France
                    </option>
                    <option value="GF" data-select2-id={162}>
                      French Guiana
                    </option>
                    <option value="PF" data-select2-id={163}>
                      French Polynesia
                    </option>
                    <option value="TF" data-select2-id={164}>
                      French Southern Territories
                    </option>
                    <option value="GA" data-select2-id={165}>
                      Gabon
                    </option>
                    <option value="GM" data-select2-id={166}>
                      Gambia
                    </option>
                    <option value="GE" data-select2-id={167}>
                      Georgia
                    </option>
                    <option value="DE" data-select2-id={168}>
                      Germany
                    </option>
                    <option value="GH" data-select2-id={169}>
                      Ghana
                    </option>
                    <option value="GI" data-select2-id={170}>
                      Gibraltar
                    </option>
                    <option value="GR" data-select2-id={171}>
                      Greece
                    </option>
                    <option value="GL" data-select2-id={172}>
                      Greenland
                    </option>
                    <option value="GD" data-select2-id={173}>
                      Grenada
                    </option>
                    <option value="GP" data-select2-id={174}>
                      Guadeloupe
                    </option>
                    <option value="GU" data-select2-id={175}>
                      Guam
                    </option>
                    <option value="GT" data-select2-id={176}>
                      Guatemala
                    </option>
                    <option value="GG" data-select2-id={177}>
                      Guernsey
                    </option>
                    <option value="GN" data-select2-id={178}>
                      Guinea
                    </option>
                    <option value="GW" data-select2-id={179}>
                      Guinea-Bissau
                    </option>
                    <option value="GY" data-select2-id={180}>
                      Guyana
                    </option>
                    <option value="HT" data-select2-id={181}>
                      Haiti
                    </option>
                    <option value="HM" data-select2-id={182}>
                      Heard Island and McDonald Islands
                    </option>
                    <option value="VA" data-select2-id={183}>
                      Holy See (Vatican City State)
                    </option>
                    <option value="HN" data-select2-id={184}>
                      Honduras
                    </option>
                    <option value="HK" data-select2-id={185}>
                      Hong Kong
                    </option>
                    <option value="HU" data-select2-id={186}>
                      Hungary
                    </option>
                    <option value="IS" data-select2-id={187}>
                      Iceland
                    </option>
                    <option value="IN" data-select2-id={188}>
                      India
                    </option>
                    <option value="ID" data-select2-id={189}>
                      Indonesia
                    </option>
                    <option value="IR" data-select2-id={190}>
                      Iran, Islamic Republic of
                    </option>
                    <option value="IQ" data-select2-id={191}>
                      Iraq
                    </option>
                    <option value="IE" data-select2-id={192}>
                      Ireland
                    </option>
                    <option value="IM" data-select2-id={193}>
                      Isle of Man
                    </option>
                    <option value="IL" data-select2-id={194}>
                      Israel
                    </option>
                    <option value="IT" data-select2-id={195}>
                      Italy
                    </option>
                    <option value="JM" data-select2-id={196}>
                      Jamaica
                    </option>
                    <option value="JP" data-select2-id={197}>
                      Japan
                    </option>
                    <option value="JE" data-select2-id={198}>
                      Jersey
                    </option>
                    <option value="JO" data-select2-id={199}>
                      Jordan
                    </option>
                    <option value="KZ" data-select2-id={200}>
                      Kazakhstan
                    </option>
                    <option value="KE" data-select2-id={201}>
                      Kenya
                    </option>
                    <option value="KI" data-select2-id={202}>
                      Kiribati
                    </option>
                    <option value="KP" data-select2-id={203}>
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="KR" data-select2-id={204}>
                      Korea, Republic of
                    </option>
                    <option value="KW" data-select2-id={205}>
                      Kuwait
                    </option>
                    <option value="KG" data-select2-id={206}>
                      Kyrgyzstan
                    </option>
                    <option value="LA" data-select2-id={207}>
                      Lao People's Democratic Republic
                    </option>
                    <option value="LV" data-select2-id={208}>
                      Latvia
                    </option>
                    <option value="LB" data-select2-id={209}>
                      Lebanon
                    </option>
                    <option value="LS" data-select2-id={210}>
                      Lesotho
                    </option>
                    <option value="LR" data-select2-id={211}>
                      Liberia
                    </option>
                    <option value="LY" data-select2-id={212}>
                      Libya
                    </option>
                    <option value="LI" data-select2-id={213}>
                      Liechtenstein
                    </option>
                    <option value="LT" data-select2-id={214}>
                      Lithuania
                    </option>
                    <option value="LU" data-select2-id={215}>
                      Luxembourg
                    </option>
                    <option value="MO" data-select2-id={216}>
                      Macao
                    </option>
                    <option value="MK" data-select2-id={217}>
                      Macedonia, the former Yugoslav Republic of
                    </option>
                    <option value="MG" data-select2-id={218}>
                      Madagascar
                    </option>
                    <option value="MW" data-select2-id={219}>
                      Malawi
                    </option>
                    <option value="MY" data-select2-id={220}>
                      Malaysia
                    </option>
                    <option value="MV" data-select2-id={221}>
                      Maldives
                    </option>
                    <option value="ML" data-select2-id={222}>
                      Mali
                    </option>
                    <option value="MT" data-select2-id={223}>
                      Malta
                    </option>
                    <option value="MH" data-select2-id={224}>
                      Marshall Islands
                    </option>
                    <option value="MQ" data-select2-id={225}>
                      Martinique
                    </option>
                    <option value="MR" data-select2-id={226}>
                      Mauritania
                    </option>
                    <option value="MU" data-select2-id={227}>
                      Mauritius
                    </option>
                    <option value="YT" data-select2-id={228}>
                      Mayotte
                    </option>
                    <option value="MX" data-select2-id={229}>
                      Mexico
                    </option>
                    <option value="FM" data-select2-id={230}>
                      Micronesia, Federated States of
                    </option>
                    <option value="MD" data-select2-id={231}>
                      Moldova, Republic of
                    </option>
                    <option value="MC" data-select2-id={232}>
                      Monaco
                    </option>
                    <option value="MN" data-select2-id={233}>
                      Mongolia
                    </option>
                    <option value="ME" data-select2-id={234}>
                      Montenegro
                    </option>
                    <option value="MS" data-select2-id={235}>
                      Montserrat
                    </option>
                    <option value="MA" data-select2-id={236}>
                      Morocco
                    </option>
                    <option value="MZ" data-select2-id={237}>
                      Mozambique
                    </option>
                    <option value="MM" data-select2-id={238}>
                      Myanmar
                    </option>
                    <option value="NA" data-select2-id={239}>
                      Namibia
                    </option>
                    <option value="NR" data-select2-id={240}>
                      Nauru
                    </option>
                    <option value="NP" data-select2-id={241}>
                      Nepal
                    </option>
                    <option value="NL" data-select2-id={242}>
                      Netherlands
                    </option>
                    <option value="NC" data-select2-id={243}>
                      New Caledonia
                    </option>
                    <option value="NZ" data-select2-id={244}>
                      New Zealand
                    </option>
                    <option value="NI" data-select2-id={245}>
                      Nicaragua
                    </option>
                    <option value="NE" data-select2-id={246}>
                      Niger
                    </option>
                    <option value="NG" data-select2-id={247}>
                      Nigeria
                    </option>
                    <option value="NU" data-select2-id={248}>
                      Niue
                    </option>
                    <option value="NF" data-select2-id={249}>
                      Norfolk Island
                    </option>
                    <option value="MP" data-select2-id={250}>
                      Northern Mariana Islands
                    </option>
                    <option value="NO" data-select2-id={251}>
                      Norway
                    </option>
                    <option value="OM" data-select2-id={252}>
                      Oman
                    </option>
                    <option value="PK" data-select2-id={253}>
                      Pakistan
                    </option>
                    <option value="PW" data-select2-id={254}>
                      Palau
                    </option>
                    <option value="PS" data-select2-id={255}>
                      Palestinian Territory, Occupied
                    </option>
                    <option value="PA" data-select2-id={256}>
                      Panama
                    </option>
                    <option value="PG" data-select2-id={257}>
                      Papua New Guinea
                    </option>
                    <option value="PY" data-select2-id={258}>
                      Paraguay
                    </option>
                    <option value="PE" data-select2-id={259}>
                      Peru
                    </option>
                    <option value="PH" data-select2-id={260}>
                      Philippines
                    </option>
                    <option value="PN" data-select2-id={261}>
                      Pitcairn
                    </option>
                    <option value="PL" data-select2-id={262}>
                      Poland
                    </option>
                    <option value="PT" data-select2-id={263}>
                      Portugal
                    </option>
                    <option value="PR" data-select2-id={264}>
                      Puerto Rico
                    </option>
                    <option value="QA" data-select2-id={265}>
                      Qatar
                    </option>
                    <option value="RE" data-select2-id={266}>
                      Réunion
                    </option>
                    <option value="RO" data-select2-id={267}>
                      Romania
                    </option>
                    <option value="RU" data-select2-id={268}>
                      Russian Federation
                    </option>
                    <option value="RW" data-select2-id={269}>
                      Rwanda
                    </option>
                    <option value="BL" data-select2-id={270}>
                      Saint Barthélemy
                    </option>
                    <option value="SH" data-select2-id={271}>
                      Saint Helena, Ascension and Tristan da Cunha
                    </option>
                    <option value="KN" data-select2-id={272}>
                      Saint Kitts and Nevis
                    </option>
                    <option value="LC" data-select2-id={273}>
                      Saint Lucia
                    </option>
                    <option value="MF" data-select2-id={274}>
                      Saint Martin (French part)
                    </option>
                    <option value="PM" data-select2-id={275}>
                      Saint Pierre and Miquelon
                    </option>
                    <option value="VC" data-select2-id={276}>
                      Saint Vincent and the Grenadines
                    </option>
                    <option value="WS" data-select2-id={277}>
                      Samoa
                    </option>
                    <option value="SM" data-select2-id={278}>
                      San Marino
                    </option>
                    <option value="ST" data-select2-id={279}>
                      Sao Tome and Principe
                    </option>
                    <option value="SA" data-select2-id={280}>
                      Saudi Arabia
                    </option>
                    <option value="SN" data-select2-id={281}>
                      Senegal
                    </option>
                    <option value="RS" data-select2-id={282}>
                      Serbia
                    </option>
                    <option value="SC" data-select2-id={283}>
                      Seychelles
                    </option>
                    <option value="SL" data-select2-id={284}>
                      Sierra Leone
                    </option>
                    <option value="SG" data-select2-id={285}>
                      Singapore
                    </option>
                    <option value="SX" data-select2-id={286}>
                      Sint Maarten (Dutch part)
                    </option>
                    <option value="SK" data-select2-id={287}>
                      Slovakia
                    </option>
                    <option value="SI" data-select2-id={288}>
                      Slovenia
                    </option>
                    <option value="SB" data-select2-id={289}>
                      Solomon Islands
                    </option>
                    <option value="SO" data-select2-id={290}>
                      Somalia
                    </option>
                    <option value="ZA" data-select2-id={291}>
                      South Africa
                    </option>
                    <option value="GS" data-select2-id={292}>
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="SS" data-select2-id={293}>
                      South Sudan
                    </option>
                    <option value="ES" data-select2-id={294}>
                      Spain
                    </option>
                    <option value="LK" data-select2-id={295}>
                      Sri Lanka
                    </option>
                    <option value="SD" data-select2-id={296}>
                      Sudan
                    </option>
                    <option value="SR" data-select2-id={297}>
                      Suriname
                    </option>
                    <option value="SJ" data-select2-id={298}>
                      Svalbard and Jan Mayen
                    </option>
                    <option value="SZ" data-select2-id={299}>
                      Swaziland
                    </option>
                    <option value="SE" data-select2-id={300}>
                      Sweden
                    </option>
                    <option value="CH" data-select2-id={301}>
                      Switzerland
                    </option>
                    <option value="SY" data-select2-id={302}>
                      Syrian Arab Republic
                    </option>
                    <option value="TW" data-select2-id={303}>
                      Taiwan, Province of China
                    </option>
                    <option value="TJ" data-select2-id={304}>
                      Tajikistan
                    </option>
                    <option value="TZ" data-select2-id={305}>
                      Tanzania, United Republic of
                    </option>
                    <option value="TH" data-select2-id={306}>
                      Thailand
                    </option>
                    <option value="TL" data-select2-id={307}>
                      Timor-Leste
                    </option>
                    <option value="TG" data-select2-id={308}>
                      Togo
                    </option>
                    <option value="TK" data-select2-id={309}>
                      Tokelau
                    </option>
                    <option value="TO" data-select2-id={310}>
                      Tonga
                    </option>
                    <option value="TT" data-select2-id={311}>
                      Trinidad and Tobago
                    </option>
                    <option value="TN" data-select2-id={312}>
                      Tunisia
                    </option>
                    <option value="TR" data-select2-id={313}>
                      Turkey
                    </option>
                    <option value="TM" data-select2-id={314}>
                      Turkmenistan
                    </option>
                    <option value="TC" data-select2-id={315}>
                      Turks and Caicos Islands
                    </option>
                    <option value="TV" data-select2-id={316}>
                      Tuvalu
                    </option>
                    <option value="UG" data-select2-id={317}>
                      Uganda
                    </option>
                    <option value="UA" data-select2-id={318}>
                      Ukraine
                    </option>
                    <option value="AE" data-select2-id={319}>
                      United Arab Emirates
                    </option>
                    <option value="GB" data-select2-id={320}>
                      United Kingdom
                    </option>
                    <option value="US" selected data-select2-id={321}>
                      United States
                    </option>
                    <option value="UM" data-select2-id={322}>
                      United States Minor Outlying Islands
                    </option>
                    <option value="UY" data-select2-id={323}>
                      Uruguay
                    </option>
                    <option value="UZ" data-select2-id={324}>
                      Uzbekistan
                    </option>
                    <option value="VU" data-select2-id={325}>
                      Vanuatu
                    </option>
                    <option value="VE" data-select2-id={326}>
                      Venezuela, Bolivarian Republic of
                    </option>
                    <option value="VN" data-select2-id={327}>
                      Viet Nam
                    </option>
                    <option value="VG" data-select2-id={328}>
                      Virgin Islands, British
                    </option>
                    <option value="VI" data-select2-id={329}>
                      Virgin Islands, U.S.
                    </option>
                    <option value="WF" data-select2-id={330}>
                      Wallis and Futuna
                    </option>
                    <option value="EH" data-select2-id={331}>
                      Western Sahara
                    </option>
                    <option value="YE" data-select2-id={332}>
                      Yemen
                    </option>
                    <option value="ZM" data-select2-id={333}>
                      Zambia
                    </option>
                    <option value="ZW" data-select2-id={334}>
                      Zimbabwe
                    </option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id={85}
                    style={{ width: "100%" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection custom-select"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex={0}
                        aria-disabled="false"
                        aria-labelledby="select2-country-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-country-container"
                          role="textbox"
                          aria-readonly="true"
                          title="United States"
                        >
                          <span>United States</span>
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation" />
                        </span>
                      </span>
                    </span>
                    <span className="dropdown-wrapper" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="input-label d-inline text-capitalize">
                    Forgot password verification by{" "}
                  </label>
                  <select
                    name="forgot_password_verification"
                    className="form-control js-select2-custom select2-hidden-accessible"
                    data-select2-id={335}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <option value="email" selected data-select2-id={337}>
                      Email
                    </option>
                    <option value="phone" data-select2-id={338}>
                      Phone
                    </option>
                  </select>
                  <span
                    className="select2 select2-container select2-container--default"
                    dir="ltr"
                    data-select2-id={336}
                    style={{ width: "100%" }}
                  >
                    <span className="selection">
                      <span
                        className="select2-selection custom-select"
                        role="combobox"
                        aria-haspopup="true"
                        aria-expanded="false"
                        tabIndex={0}
                        aria-disabled="false"
                        aria-labelledby="select2-forgot_password_verification-8z-container"
                      >
                        <span
                          className="select2-selection__rendered"
                          id="select2-forgot_password_verification-8z-container"
                          role="textbox"
                          aria-readonly="true"
                          title="Email"
                        >
                          <span>Email</span>
                        </span>
                        <span
                          className="select2-selection__arrow"
                          role="presentation"
                        >
                          <b role="presentation" />
                        </span>
                      </span>
                    </span>
                    <span className="dropdown-wrapper" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-12">
                <div className="form-group">
                  <label>Phone Verification ( OTP )</label>
                  <small style={{ color: "red" }}>*</small>
                  <div className="input-group input-group-md-down-break">
                    <div className="form-control">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultValue={1}
                          name="phone_verification"
                          id="phone_verification_on"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="phone_verification_on"
                        >
                          On
                        </label>
                      </div>
                    </div>
                    <div className="form-control">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultValue={0}
                          name="phone_verification"
                          id="phone_verification_off"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="phone_verification_off"
                        >
                          Off
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="form-group">
                  <label>Email Verification</label>
                  <small style={{ color: "red" }}>*</small>
                  <div className="input-group input-group-md-down-break">
                    <div className="form-control">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultValue={1}
                          name="email_verification"
                          id="email_verification_on"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="email_verification_on"
                        >
                          On
                        </label>
                      </div>
                    </div>
                    <div className="form-control">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultValue={0}
                          name="email_verification"
                          id="email_verification_off"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="email_verification_off"
                        >
                          Off
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="form-group">
                  <label>Order Verification</label>
                  <small style={{ color: "red" }}>*</small>
                  <div className="input-group input-group-md-down-break">
                    <div className="form-control">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultValue={1}
                          name="order_verification"
                          id="order_verification1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="order_verification1"
                        >
                          On
                        </label>
                      </div>
                    </div>
                    <div className="form-control">
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          defaultValue={0}
                          name="order_verification"
                          id="order_verification2"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="order_verification2"
                        >
                          Off
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5>Web Logo </h5>
                    <span className="badge badge-soft-danger">
                      ( 250x60 px )
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <center>
                      <img
                        width={200}
                        height={60}
                        id="viewerWL"
                        src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b218f20766.png"
                      />
                    </center>
                    <hr />
                    <div className="row pl-4 pr-4">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <input
                          type="file"
                          name="company_web_logo"
                          id="customFileUploadWL"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUploadWL"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5>Mobile Logo </h5>
                    <span className="badge badge-soft-danger">
                      ( 100X60 px )
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <center>
                      <img
                        width={100}
                        height={60}
                        id="viewerML"
                        src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b21aa4c126.png"
                      />
                    </center>
                    <hr />
                    <div className="row pl-4 pr-4">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <input
                          type="file"
                          name="company_mobile_logo"
                          id="customFileUploadML"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUploadML"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5>Web footer Logo </h5>
                    <span className="badge badge-soft-danger">
                      ( 250x60 px )
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <center>
                      <img
                        width={250}
                        id="viewerWFL"
                        src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b22b07a7d9.png"
                      />
                    </center>
                    <hr />
                    <div className="row pl-4 pr-4">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <input
                          type="file"
                          name="company_footer_logo"
                          id="customFileUploadWFL"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUploadWFL"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5>Web fav icon </h5>
                    <span className="badge badge-soft-danger">
                      ( ratio 1:1 )
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <center>
                      <img
                        width={60}
                        id="viewerFI"
                        src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b218f224de.png"
                      />
                    </center>
                    <hr />
                    <div className="row pl-4 pr-4">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <input
                          type="file"
                          name="company_fav_icon"
                          id="customFileUploadFI"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUploadFI"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5>Loader gif </h5>
                    <span className="badge badge-soft-danger">
                      ( Ratio 1:1 )
                    </span>
                  </div>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <center>
                      <img
                        width={60}
                        id="viewerLoader"
                        src="https://6valley.6amtech.com/storage/app/public/company/2021-11-22-619b24915957a.png"
                      />
                    </center>
                    <hr />
                    <div className="row pl-4 pr-4">
                      <div className="col-12" style={{ textAlign: "left" }}>
                        <input
                          type="file"
                          name="loader_gif"
                          id="customFileUploadLoader"
                          className="custom-file-input"
                          accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileUploadLoader"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body" style={{ padding: "20px" }}>
                    <h4>Web color setup</h4>
                    <div className="form-group">
                      <label>Primary</label>
                      <input
                        type="color"
                        name="primary"
                        defaultValue="#1b7fed"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Secondary</label>
                      <input
                        type="color"
                        name="secondary"
                        defaultValue="#f7931e"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body" style={{ padding: "20px" }}>
                    <h4>Announcement setup</h4>
                    <div className="form-group mb-2 mt-2">
                      <input
                        type="radio"
                        name="announcement_status"
                        defaultValue={1}
                      />
                      <label style={{ paddingLeft: "10px" }}>Active</label>
                      <br />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="radio"
                        name="announcement_status"
                        defaultValue={0}
                        defaultChecked
                      />
                      <label style={{ paddingLeft: "10px" }}>Inactive</label>
                      <br />
                    </div>
                    <div className="form-group">
                      <label>Background color</label>
                      <input
                        type="color"
                        name="announcement_color"
                        defaultValue
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Text color</label>
                      <input
                        type="color"
                        name="text_color"
                        defaultValue
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Text</label>
                      <input
                        className="form-control"
                        type="text"
                        name="announcement"
                        defaultValue
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AdminBusinessSettingsWebConfig;
