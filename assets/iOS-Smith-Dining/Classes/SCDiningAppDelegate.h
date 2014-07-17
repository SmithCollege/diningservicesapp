//
//  SCDiningAppDelegate.h
//  SCDining
//
//  Created by Bill Weakley on 12/8/10.
//  Copyright 2010 Fonixland Studios. All rights reserved.
//

#import <UIKit/UIKit.h>

@class SCDiningViewController;

@interface SCDiningAppDelegate : NSObject <UIApplicationDelegate> {}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet SCDiningViewController *viewController;

@end

