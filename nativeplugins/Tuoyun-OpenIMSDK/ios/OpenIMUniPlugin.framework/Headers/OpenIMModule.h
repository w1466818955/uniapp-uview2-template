//
//  OpenIMUniPlugin.h
//  OpenIMUniPlugin
//
//  Created by blooming on 2022/12/13.
//

#import <Foundation/Foundation.h>
#import "DCUniModule.h"
#import "CallbackProxy.h"
@import OpenIMCore;

NS_ASSUME_NONNULL_BEGIN

@interface OpenIMModule : DCUniModule <Open_im_sdk_callbackOnConnListener,Open_im_sdk_callbackOnUserListener, Open_im_sdk_callbackOnAdvancedMsgListener, Open_im_sdk_callbackOnFriendshipListener, Open_im_sdk_callbackOnConversationListener, Open_im_sdk_callbackOnGroupListener,Open_im_sdk_callbackOnOrganizationListener,Open_im_sdk_callbackOnSignalingListener,Open_im_sdk_callbackOnWorkMomentsListener,Open_im_sdk_callbackOnBatchMsgListener>

- (void)pushEvent:(NSString *) eventName msg:(nullable id) msg;

@end

NS_ASSUME_NONNULL_END
