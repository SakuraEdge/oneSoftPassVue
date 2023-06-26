<template>
  <div>
    <div  class="n-scrollbar">
      <div  class="n-scrollbar-container">
        <div  class="n-scrollbar-content"><!---->
          <div class="container" >
            <div class="n-grid">
              <el-card  style="grid-column: span 8 / span 8;">
                <div class="n-card n-card--bordered">
                  <div class="n-card__content" >
                    <div class="n-page-header-wrapper">
                      <div class="n-page-header">
                        <div class="n-page-header__main"><!---->
                          <div class="n-page-header__avatar">
                            <span class="n-avatar">
                              <img class="avatar-img"
                                src="https://gravatar.globalslb.net/avatar/bc5d8da384ce6725bbf48e0c428eea65"
                                data-image-src="https://gravatar.globalslb.net/avatar/bc5d8da384ce6725bbf48e0c428eea65">
                              <!----></span>
                          </div>
                          <div class="n-page-header__title">{{ username }}</div><!----></div>
                        <div class="n-page-header__extra">
                          <div>普通用户 ·
                            <span>
                              长期有效
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="n-page-header-content">
                        <div class="n-grid"
                             style="display: grid; grid-template-columns: repeat(4, minmax(0px, 1fr));">
                          <div  style="grid-column: span 1 / span 1;">
                            <div class="n-statistic"
                                 style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-label-font-size: 14px; --n-label-font-weight: 400; --n-label-text-color: rgb(118, 124, 130); --n-value-font-weight: 400; --n-value-font-size: 24px; --n-value-prefix-text-color: rgb(51, 54, 57); --n-value-suffix-text-color: rgb(51, 54, 57); --n-value-text-color: rgb(51, 54, 57);">
                              <div class="n-statistic__label">UID</div>
                              <div class="n-statistic-value"><!----><span
                                  class="n-statistic-value__content">{{ u_id }}</span><!----></div>
                            </div>
                          </div>
                          <div  style="grid-column: span 1 / span 1;">
                            <div class="n-statistic" 
                                 style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-label-font-size: 14px; --n-label-font-weight: 400; --n-label-text-color: rgb(118, 124, 130); --n-value-font-weight: 400; --n-value-font-size: 24px; --n-value-prefix-text-color: rgb(51, 54, 57); --n-value-suffix-text-color: rgb(51, 54, 57); --n-value-text-color: rgb(51, 54, 57);">
                              <div class="n-statistic__label">手机号</div>
                              <div class="n-statistic-value"><!----><span
                                  class="n-statistic-value__content">{{tel}}</span><!----></div>
                            </div>
                          </div>
                          <div  style="grid-column: span 1 / span 1;">
                            <div class="n-statistic" 
                                 style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-label-font-size: 14px; --n-label-font-weight: 400; --n-label-text-color: rgb(118, 124, 130); --n-value-font-weight: 400; --n-value-font-size: 24px; --n-value-prefix-text-color: rgb(51, 54, 57); --n-value-suffix-text-color: rgb(51, 54, 57); --n-value-text-color: rgb(51, 54, 57);">
                              <div class="n-statistic__label">邮箱</div>
                              <div class="n-statistic-value"><!----><span
                                  class="n-statistic-value__content">{{email}}</span><!----></div>
                            </div>
                          </div>
                          <div  style="grid-column: span 2 / span 1;">
                            <div class="n-statistic" 
                                 style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-label-font-size: 14px; --n-label-font-weight: 400; --n-label-text-color: rgb(118, 124, 130); --n-value-font-weight: 400; --n-value-font-size: 24px; --n-value-prefix-text-color: rgb(51, 54, 57); --n-value-suffix-text-color: rgb(51, 54, 57); --n-value-text-color: rgb(51, 54, 57);">
                              <div class="n-statistic__label">
                                个性签名：
                              </div>

                              <div class="n-statistic-value"><!----><span class="n-statistic-value__content"><!----><div
                                  >{{description}}</div><!----></span><!----></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="n-page-header-footer">
                        <div  class="n-space" 
                             style="display: flex; flex-flow: row wrap; justify-content: flex-start; gap: 8px 12px;">
                          <div><!---->
                            <div >
                              <button class="n-button n-button--default-type n-button--medium-type" tabindex="0"
                                      type="button" @click="showPwdDialog()"
                                      style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #18a058; --n-text-color: rgb(51, 54, 57); --n-text-color-hover: #36ad6a; --n-text-color-pressed: #0c7a43; --n-text-color-focus: #36ad6a; --n-text-color-disabled: rgb(51, 54, 57); --n-border: 1px solid rgb(224, 224, 230); --n-border-hover: 1px solid #36ad6a; --n-border-pressed: 1px solid #0c7a43; --n-border-focus: 1px solid #36ad6a; --n-border-disabled: 1px solid rgb(224, 224, 230); --n-width: initial; --n-height: 34px; --n-font-size: 14px; --n-padding: 0 14px; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: 3px;">
                                <!----><span class="n-button__icon"><div class="n-icon-slot"><i role="img"
                                                                                                class="n-icon"
                                                                                                style="--n-bezier: cubic-bezier(.4, 0, .2, 1);">
                                <svg
                                  viewBox="0 0 24 24">
                                  <path
                                  d="M12.65 10A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"
                                  fill="currentColor"></path>
                                </svg>
                              </i>
                              </div>
                              </span>
                                <span class="n-button__content"> 修改密码</span>
                                <div aria-hidden="true" class="n-base-wave"></div>
                                <div aria-hidden="true" class="n-button__border"></div>
                                <div aria-hidden="true" class="n-button__state-border"></div>
                              </button>
                            </div><!----></div>
                          <div  style="max-width: 100%;"><button
                              class="n-button n-button--default-type n-button--medium-type" type="button"
                              @click="showEditDialog"
                              style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #18a058; --n-text-color: rgb(51, 54, 57); --n-text-color-hover: #36ad6a; --n-text-color-pressed: #0c7a43; --n-text-color-focus: #36ad6a; --n-text-color-disabled: rgb(51, 54, 57); --n-border: 1px solid rgb(224, 224, 230); --n-border-hover: 1px solid #36ad6a; --n-border-pressed: 1px solid #0c7a43; --n-border-focus: 1px solid #36ad6a; --n-border-disabled: 1px solid rgb(224, 224, 230); --n-width: initial; --n-height: 34px; --n-font-size: 14px; --n-padding: 0 14px; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: 3px;">
                            <!----><span class="n-button__icon"><div class="n-icon-slot" ><i role="img"
                                                                                                        class="n-icon"
                                                                                                        
                                                                                                        style="--n-bezier: cubic-bezier(.4, 0, .2, 1);"><svg
                              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 24 24" ><path
                              d="M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48l1.3-.75l-.85-1.48H7v-1.5H5.3l.85-1.47L4.85 7L4 8.47L3.15 7l-1.3.75l.85 1.47H1v1.5h1.7l-.85 1.48l1.3.75zm6.7-.75l1.3.75l.85-1.48l.85 1.48l1.3-.75l-.85-1.48H15v-1.5h-1.7l.85-1.47l-1.3-.75L12 8.47L11.15 7l-1.3.75l.85 1.47H9v1.5h1.7l-.85 1.48zM23 9.22h-1.7l.85-1.47l-1.3-.75L20 8.47L19.15 7l-1.3.75l.85 1.47H17v1.5h1.7l-.85 1.48l1.3.75l.85-1.48l.85 1.48l1.3-.75l-.85-1.48H23v-1.5z"
                              fill="currentColor"></path></svg></i></div></span><span
                              class="n-button__content"> 修改个性签名 </span>
                            <div aria-hidden="true" class="n-base-wave"></div>
                            <div aria-hidden="true" class="n-button__border"></div>
                            <div aria-hidden="true" class="n-button__state-border"></div>
                          </button></div>
                          <div  style="max-width: 100%;">
                            <button class="n-button n-button--default-type n-button--medium-type" tabindex="0"
                                    type="button" 
                                    style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #18a058; --n-text-color: rgb(51, 54, 57); --n-text-color-hover: #36ad6a; --n-text-color-pressed: #0c7a43; --n-text-color-focus: #36ad6a; --n-text-color-disabled: rgb(51, 54, 57); --n-border: 1px solid rgb(224, 224, 230); --n-border-hover: 1px solid #36ad6a; --n-border-pressed: 1px solid #0c7a43; --n-border-focus: 1px solid #36ad6a; --n-border-disabled: 1px solid rgb(224, 224, 230); --n-width: initial; --n-height: 34px; --n-font-size: 14px; --n-padding: 0 14px; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: 3px;">
                              <!----><span class="n-button__icon"><div class="n-icon-slot" ><i role="img"
                                                                                                          class="n-icon"
                                                                                                          
                                                                                                          style="--n-bezier: cubic-bezier(.4, 0, .2, 1);"><svg
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 24 24" ><path
                                d="M22 5.72l-4.6-3.86l-1.29 1.53l4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86L2 5.71l1.29 1.53l4.59-3.85zM12.5 8H11v6l4.75 2.85l.75-1.23l-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a9 9 0 0 0 0-18zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"
                                fill="currentColor"></path></svg></i></div></span><span
                                class="n-button__content"> 签到 </span>
                              <div aria-hidden="true" class="n-base-wave"></div>
                              <div aria-hidden="true" class="n-button__border"></div>
                              <div aria-hidden="true" class="n-button__state-border"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div><!----><!---->
                </div>
              </el-card>
              <el-card  style="grid-column: span 4 / span 4;">
                <div class="n-card n-card--bordered"
                     style="--n-padding-top: 19px; --n-padding-bottom: 20px; --n-padding-left: 24px;  --n-title-font-size: 18px;">
                  <!---->
                  <div class="n-card-header">
                    <div class="n-card-header__main" role="heading"> 兑换礼品卡</div><!----><!----></div>
                  <div class="n-card__content" >
                    <div  style="margin-bottom: 12px;"> 礼品卡号:</div>
                    <div class="n-input n-input--resizable n-input--stateful">
                      <div class="n-input-wrapper"><!---->
                        <div class="n-input__input">
                          <input type="text" class="n-input__input-el" size="20">
                        </div>
                        <div class="n-input__suffix">
                          <div class="n-base-clear">
                            <div class="n-base-clear__placeholder"><!----></div>
                          </div><!----><!----><!----><!----><!----></div>
                      </div><!----><!---->
                      <div class="n-input__border"></div>
                      <div class="n-input__state-border"></div><!----></div>
                  </div>
                  <div class="n-card__footer" >
                    <div  class="n-space" 
                         style="display: flex; flex-flow: row wrap; justify-content: flex-end; gap: 8px 12px;">
                      <div  style="max-width: 100%;">
                        <button class="n-button n-button--primary-type n-button--medium-type n-button--ghost"
                                tabindex="0" type="button" 
                                style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #18a058; --n-text-color: #18a058; --n-text-color-hover: #36ad6a; --n-text-color-pressed: #0c7a43; --n-text-color-focus: #36ad6a; --n-text-color-disabled: #18a058; --n-border: 1px solid #18a058; --n-border-hover: 1px solid #36ad6a; --n-border-pressed: 1px solid #0c7a43; --n-border-focus: 1px solid #36ad6a; --n-border-disabled: 1px solid #18a058; --n-width: initial; --n-height: 34px; --n-font-size: 14px; --n-padding: 0 14px; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: 3px;">
                          <!----><span class="n-button__icon"><div class="n-icon-slot" ><i role="img"
                                                                                                      class="n-icon"
                                                                                                      
                                                                                                      style="--n-bezier: cubic-bezier(.4, 0, .2, 1);"><svg
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24" ><path
                            d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67l-.5-.68C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83L8.62 12L11 8.76l1-1.36l1 1.36L15.38 12L17 10.83L14.92 8H20v6z"
                            fill="currentColor"></path></svg></i></div></span><span
                            class="n-button__content"> 兑换 </span>
                          <div aria-hidden="true" class="n-base-wave"></div>
                          <div aria-hidden="true" class="n-button__border"></div>
                          <div aria-hidden="true" class="n-button__state-border"></div>
                        </button>
                      </div>
                    </div>
                  </div><!----></div>
              </el-card>
              <el-card  style="grid-column: span 8 / span 8;">
                <div class="n-card n-card--bordered"
                     style="--n-padding-top: 19px; --n-padding-bottom: 20px; --n-padding-left: 24px;  --n-title-font-size: 18px;">
                <!---->
                  <div class="n-card-header">
                    <div class="n-card-header__main" role="heading">最近签到信息</div>
                  </div>
                  <div class="n-card__content"  style="overflow: auto;">
                    <table class="n-table n-table--bottom-bordered n-table--bordered n-table--single-line"
                           
                           style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-td-color: #fff; --n-td-color-modal: #fff; --n-td-color-popover: #fff; --n-td-text-color: rgb(51, 54, 57); --n-border-color: rgba(239, 239, 245, 1); --n-border-color-modal: rgba(239, 239, 245, 1); --n-border-color-popover: rgba(239, 239, 245, 1); --n-border-radius: 3px; --n-font-size: 14px; --n-th-color: rgba(250, 250, 252, 1); --n-th-color-modal: rgba(250, 250, 252, 1); --n-th-color-popover: rgba(250, 250, 252, 1); --n-th-font-weight: 500; --n-th-text-color: rgb(31, 34, 37); --n-line-height: 1.6; --n-td-padding: 12px; --n-th-padding: 12px; --n-td-color-striped: rgba(250, 250, 252, 1); --n-td-color-striped-modal: rgba(250, 250, 252, 1); --n-td-color-striped-popover: rgba(250, 250, 252, 1); white-space: nowrap;">
                      <thead>
                      <tr>
                        <th>用户名</th>
                        <th>签到信息</th>
                        <th>签到时间</th>
                        <th>获得经验</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>
                          <span>梦花</span>
                        </td>
                        <td>
                          <span>sbyd.</span>
                        </td>
                        <td>
                          <span>2023-06-01</span>
                        </td>
                        <td>
                          <span>+3</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>admin</span>
                        </td>
                        <td>
                          <span>原神，启动！</span>
                        </td>
                        <td>
                          <span>2023-06-01</span>
                          </td>
                        <td>
                          <span>+5</span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="n-card__footer" >
                    <div  class="n-space" 
                         style="display: flex; flex-flow: row wrap; justify-content: flex-end; gap: 8px 12px;">
                      <div  style="max-width: 100%;">
                        <button class="n-button n-button--default-type n-button--medium-type n-button--ghost"
                                tabindex="0" type="button" 
                                style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #18a058; --n-text-color: rgb(51, 54, 57); --n-text-color-hover: #36ad6a; --n-text-color-pressed: #0c7a43; --n-text-color-focus: #36ad6a; --n-text-color-disabled: rgb(51, 54, 57); --n-border: 1px solid rgb(224, 224, 230); --n-border-hover: 1px solid #36ad6a; --n-border-pressed: 1px solid #0c7a43; --n-border-focus: 1px solid #36ad6a; --n-border-disabled: 1px solid rgb(224, 224, 230); --n-width: initial; --n-height: 34px; --n-font-size: 14px; --n-padding: 0 14px; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: 3px;">
                          <!----><span class="n-button__icon"><div class="n-icon-slot" ><i role="img"
                                                                                                      class="n-icon"
                                                                                                      
                                                                                                      style="--n-bezier: cubic-bezier(.4, 0, .2, 1);"><svg
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24" ><path
                            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
                            fill="currentColor"></path></svg></i></div></span><span class="n-button__content"> 查询历史签到 </span>
                          <div aria-hidden="true" class="n-base-wave"></div>
                          <div aria-hidden="true" class="n-button__border"></div>
                          <div aria-hidden="true" class="n-button__state-border"></div>
                        </button>
                      </div>
                    </div>
                  </div><!---->
                </div>
              </el-card>
              <el-card  style="grid-column: span 4 / span 4;">
                <div class="n-card n-card--bordered"
                     style="--n-padding-top: 19px; --n-padding-bottom: 20px; --n-padding-left: 24px;  --n-title-font-size: 18px;">
                <!---->
                  <div class="n-card-header">
                    <div class="n-card-header__main" role="heading"> 账号信息</div><!----><!----></div>
                  <div class="n-card__content" >
                    <table class="n-table n-table--bottom-bordered n-table--single-line userInfoTable"
                           
                           style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-td-color: #fff; --n-td-color-modal: #fff; --n-td-color-popover: #fff; --n-td-text-color: rgb(51, 54, 57); --n-border-color: rgba(239, 239, 245, 1); --n-border-color-modal: rgba(239, 239, 245, 1); --n-border-color-popover: rgba(239, 239, 245, 1); --n-border-radius: 3px; --n-font-size: 14px; --n-th-color: rgba(250, 250, 252, 1); --n-th-color-modal: rgba(250, 250, 252, 1); --n-th-color-popover: rgba(250, 250, 252, 1); --n-th-font-weight: 500; --n-th-text-color: rgb(31, 34, 37); --n-line-height: 1.6; --n-td-padding: 12px; --n-th-padding: 12px; --n-td-color-striped: rgba(250, 250, 252, 1); --n-td-color-striped-modal: rgba(250, 250, 252, 1); --n-td-color-striped-popover: rgba(250, 250, 252, 1);">
                      <tbody >
                      <tr >
                        <td >访问密钥</td>
                        <td >
                          <div ><span
                              style="word-break: break-word; display: none;">fsmbwo5c7l01t3z4</span><a
                              style="cursor: pointer; display: flex; flex-wrap: nowrap; align-items: center; gap: 4px;"><i
                              role="img" class="n-icon"
                              style="--n-bezier: cubic-bezier(.4, 0, .2, 1); font-size: 16px;">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                 viewBox="0 0 24 24">
                              <path
                                  d="M21 10h-8.35A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H13l2 2l2-2l2 2l4-4.04L21 10zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3s3 1.35 3 3s-1.35 3-3 3z"
                                  fill="currentColor"></path>
                            </svg>
                          </i> 点击显示</a></div>
                        </td>
                      </tr>
                      <tr >
                        <td >上次登录时间</td>
                        <td ><span >{{loginTime}}</span></td>
                      </tr>
                      <tr >
                        <td >注册时间</td>
                        <td >{{createTime}}</td>
                      </tr><!---->
                      </tbody>
                    </table>
                  </div>
                  <div class="n-card__footer" >
                    <div class="n-space"
                         style="display: flex; flex-flow: row wrap; justify-content: flex-end; gap: 8px 12px;">
                      <div style="max-width: 100%;">
                        <button
                            v-on:click="loginOut()"
                            class="n-button n-button--error-type n-button--medium-type n-button--ghost"
                            style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-bezier-ease-out: cubic-bezier(0, 0, .2, 1); --n-ripple-duration: .6s; --n-opacity-disabled: 0.5; --n-wave-opacity: 0.6; font-weight: 400; --n-color: #0000; --n-color-hover: #0000; --n-color-pressed: #0000; --n-color-focus: #0000; --n-color-disabled: #0000; --n-ripple-color: #d03050; --n-text-color: #d03050; --n-text-color-hover: #de576d; --n-text-color-pressed: #ab1f3f; --n-text-color-focus: #de576d; --n-text-color-disabled: #d03050; --n-border: 1px solid #d03050; --n-border-hover: 1px solid #de576d; --n-border-pressed: 1px solid #ab1f3f; --n-border-focus: 1px solid #de576d; --n-border-disabled: 1px solid #d03050; --n-width: initial; --n-height: 34px; --n-font-size: 14px; --n-padding: 0 14px; --n-icon-size: 18px; --n-icon-margin: 6px; --n-border-radius: 3px;">
                          <!----><span class="n-button__icon">
                        <div class="n-icon-slot">
                        <i role="img" class="n-icon" style="--n-bezier: cubic-bezier(.4, 0, .2, 1);">
                          <svg viewBox="0 0 24 24">
                            <path
                                d="M15.18 10.94c.2-.44.32-.92.32-1.44C15.5 7.57 13.93 6 12 6c-.52 0-1 .12-1.44.32l4.62 4.62z"
                                fill="currentColor">
                            </path>
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 13c-2.32 0-4.45.8-6.14 2.12A7.957 7.957 0 0 1 4 12c0-1.85.63-3.55 1.69-4.9l2.86 2.86a3.47 3.47 0 0 0 2.99 2.99l2.2 2.2c-.57-.1-1.15-.15-1.74-.15zm6.31 1.9L7.1 5.69A7.902 7.902 0 0 1 12 4c4.42 0 8 3.58 8 8c0 1.85-.63 3.54-1.69 4.9z"
                                fill="currentColor">
                            </path>
                          </svg>
                        </i>
                      </div>
                      </span>
                          <span class="n-button__content"> 退出登录
                        </span>
                          <div aria-hidden="true" class="n-button__border"></div>
                        </button>
                      </div>
                    </div>
                  </div><!----></div>
              </el-card>
            </div><!----><!----></div>
        </div>
      </div>
      <div class="n-scrollbar-rail n-scrollbar-rail--vertical" data-scrollbar-rail="true"
           aria-hidden="true"><!----></div><!----></div>
    <div style="margin-top: 2%">
    </div>
    <el-dialog title="编辑个性签名" :visible.sync="editDialogVisible">
      <el-form :model="editForm">
        <el-form-item>
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="pwdDialogVisible">
      <el-form :model="pwdForm">
        <el-form-item>
          <div class="pwd-input">
            <el-input v-model="pwdForm.oldPwd" placeholder="请输入旧密码" show-password></el-input>
          </div >
          <div class="pwd-input">
            <el-input v-model="pwdForm.newPwd" placeholder="请输入新密码" show-password></el-input>
          </div>
          <div class="pwd-input">
            <el-input v-model="pwdForm.rePwd" placeholder="请再次输入密码" show-password></el-input>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPwdForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/css/person.css"
import cookie from "@/js/cookie";
export default {
  name: "userInfo",
  data() {
    return {
      u_id: cookie.getCookie("id"),
      username: "",
      tel: "",
      email: "",
      createTime: "",
      description: "",
      loginTime: "",
      editDialogVisible: false,
      pwdDialogVisible: false,
      editForm: {
        description: ''
      },
      pwdForm: {
        oldPwd: "",
        newPwd: "",
        rePwd: "",
      }

    }
  },
  created() {
    if (cookie.getCookie("id") === null){
      this.error("错误！","请先登录后再查看个人信息")
      this.$router.push("/login")
    }
    else {
      this.$axios.post("/getUserInfo",{
        "id": cookie.getCookie("id")
      }).then(res =>{
        let result = res.data.result;
        this.username = result.name;
        this.tel = result.tel;
        this.email = result.email;
        this.description = result.description;
        this.createTime = result.create_TIME;
        this.loginTime = result.login_TIME;
      }).catch(res =>{
        this.error("出现未知错误","请及时联系管理员")
      })
    }

  },
  methods: {
    error(title,info) {
      this.$notify({
        title: title,
        message: info,
        showClose: false,
        type: "error",
        duration: 2000
      })
    },
    success(title,info){
      this.$notify({
        title: title,
        message: info,
        showClose: false,
        type: "success",
        duration: 2000
      })
    },
    loginOut(){
      cookie.clearCookie("id");
      cookie.clearCookie("password");
      this.success("登出成功","已自动返回首页...")
      this.$router.push("/")
    },
    showEditDialog() {
      this.editForm.description = this.description;
      this.editDialogVisible = true;
    },
    showPwdDialog() {
      this.pwdForm.newPwd = ""
      this.pwdForm.oldPwd = ""
      this.pwdForm.rePwd = ""
      this.pwdDialogVisible = true;
    },
    submitEditForm() {
      // 通过后端接口提交修改后的个人描述
      this.$axios.post("/updateDes",{
        id: cookie.getCookie("id"),
        description: this.editForm.description
      }).then(res => {
        this.description = this.editForm.description;
        this.success("成功","已成功修改个性签名");
        this.editDialogVisible = false;
      }).catch(res => {
        this.error("出现未知错误！","请及时联系管理员")
      })
    },
    submitPwdForm() {
      if (this.pwdForm.newPwd === "" || this.pwdForm.rePwd === "" || this.pwdForm.oldPwd === ""){
        this.error("密码修改失败","输入的内容不能为空")
      }
      else if (this.pwdForm.newPwd !== this.pwdForm.rePwd){
        this.error("密码修改失败","输入的新密码不匹配，请重试")
      }
      else{
        this.$axios.post("/updatePwd",{
          id: cookie.getCookie("id"),
          pwd: this.pwdForm.oldPwd,
          newPwd: this.pwdForm.newPwd
        }).then(res => {
          if (res.data.code === 300){
            this.error("密码修改失败","旧密码有误，请重试")
          }
          else {
            this.success("密码修改成功，已为你返回首页")
            this.$router.push("/")
          }
        }).catch(res => {
          this.error("出现未知错误！","请及时联系管理员")
        })
      }
    }
  }
}
</script>

<style scoped>
.pwd-input{
  padding-bottom: 3%;
}
</style>