//
//  UploadFileCallbackProxy.h
//  OpenIMUniPlugin
//
//  Created by Admin on 2022/6/14.
//

#import <Foundation/Foundation.h>
#import "DCUniModule.h"
#import "OpenIMModule.h"
@import OpenIMCore;

NS_ASSUME_NONNULL_BEGIN

@interface UploadFileCallbackProxy : NSObject <Open_im_sdk_callbackSendMsgCallBack>

- (id)initWithOpid:(NSString *)opid module:(OpenIMModule *)module;

@end

NS_ASSUME_NONNULL_END
