//
//  SCDiningViewController.h
//  SCDining
//
//  Created by Bill Weakley on 12/8/10.
//  Copyright 2010 Fonixland Studios. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SCDiningViewController : UIViewController <UIPickerViewDelegate, UIPickerViewDataSource, UITableViewDataSource, UITableViewDelegate> {}

//@property (nonatomic, retain) IBOutlet UILabel *houseName;
@property (nonatomic, retain) NSString *houseName;
@property (nonatomic, retain) NSString *mealText;
@property (nonatomic, retain) IBOutlet UIPickerView *housePicker;
@property (nonatomic, retain) IBOutlet UITableView *houseView;
@property (nonatomic, retain) NSMutableArray *detailArray;
@property (nonatomic, retain) NSString *mealName;
@property (nonatomic, retain) IBOutlet UISegmentedControl *mealSegment;
@property (nonatomic, retain) IBOutlet UITableView *mealView;
@property (nonatomic, retain) IBOutlet UITableViewCell *mealViewCell;
@property (nonatomic, retain) IBOutlet UITextView *mealTextView;
@property (nonatomic, retain) NSMutableArray *mealArray;
@property (nonatomic, retain) IBOutlet UILabel *dateLabel;


-(IBAction) updateMeal;
-(void) loadHouseList;
-(void) loadMeal:(NSString *)meal forHouse:(NSString *)house forDate:(NSString *)date;
@end

