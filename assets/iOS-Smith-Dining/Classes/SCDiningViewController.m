//
//  SCDiningViewController.m
//  SCDining
//
//  Created by Bill Weakley on 12/8/10.
//  Copyright 2010 Fonixland Studios. All rights reserved.
//

#import "SCDiningViewController.h"

@implementation SCDiningViewController
@synthesize houseName;
@synthesize mealText;
@synthesize housePicker;
@synthesize houseView;
@synthesize detailArray;
@synthesize mealName;
@synthesize mealSegment;
@synthesize mealView;
@synthesize mealViewCell;
@synthesize mealArray;
@synthesize mealTextView;
@synthesize dateLabel;


/*
// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}
*/


/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}
*/



// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
    NSMutableArray *array = [[NSMutableArray alloc] init];
    self.mealArray = array;
    [array release];
	NSDate *todayDate = [[NSDate alloc] init];
	NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
	[dateFormatter setTimeZone:[NSTimeZone timeZoneWithName:@"EST"]];
	[dateFormatter setDateFormat:@"EEEE, MMMM d"];
	dateLabel.text = [NSString stringWithFormat:@"%@", [dateFormatter stringFromDate:todayDate]];
	[self loadHouseList];
	//[self loadMeal:@"Breakfast" forHouse:[detailArray objectAtIndex:0] forDate:@"2011-02-28"];
}

-(void) viewDidAppear:(BOOL)animated{
    NSIndexPath *indexPath = [NSIndexPath indexPathForRow:0 inSection:0];
    [self.houseView selectRowAtIndexPath:indexPath animated:YES scrollPosition:UITableViewScrollPositionMiddle];
	[self loadMeal:@"Breakfast" forHouse:[detailArray objectAtIndex:0] forDate:@"2011-02-28"];
}

-(IBAction) updateMeal {
	//mealName.text = [mealSegment titleForSegmentAtIndex:[mealSegment selectedSegmentIndex]];
    [self.mealArray removeAllObjects];
    [self loadMeal:[mealSegment titleForSegmentAtIndex:[mealSegment selectedSegmentIndex]] forHouse:houseName forDate:@"2011-02-28"];
}

-(void) loadHouseList {
	NSString *urlString = @"http://www.smith.edu/ws/iphone/dining.php?action=getDiningHalls";
	NSString *dateStringURL =[urlString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
	
	NSURL *dataURL = [NSURL URLWithString:dateStringURL];
	
	urlString = nil;
	
	NSString *returnString = [NSString stringWithContentsOfURL:dataURL encoding:NSUTF8StringEncoding error:nil];

	NSArray *returnData = [returnString componentsSeparatedByString:@"\r"];
	
	for (NSString *values in returnData) {
		if ((!values) || ([values isEqualToString:@""])) {
		} else {
			// be sure to retain here because componentsSeparatedByString is autoreleased
			detailArray = [[values componentsSeparatedByString:@"\t"] retain];
			//NSLog(@"detailArray: %@", detailArray);
		}
	}
	// [detailArray insertObject:@"Pick a House:" atIndex:0];
	self.houseName = [detailArray objectAtIndex:0];
}

- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView {
	return 1;
}

- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component {	
	return [detailArray count];
}

- (CGFloat)pickerView:(UIPickerView *)pickerView rowHeightForComponent:(NSInteger)component {
    return 40;
}

- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component {
	return [detailArray objectAtIndex:row];
}

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component {
    self.houseName = [detailArray objectAtIndex:row];
    [self.mealArray removeAllObjects];
    [self loadMeal:[mealSegment titleForSegmentAtIndex:[mealSegment selectedSegmentIndex]] forHouse:[detailArray objectAtIndex:row] forDate:@"2011-02-28"];
    [self.mealView reloadData];
}

/*
// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}
*/

-(void) loadMeal:(NSString *)meal forHouse:(NSString *)house forDate:(NSString *)date {
    NSString *urlString = [NSString stringWithFormat:@"http://www.smith.edu/ws/iphone/dining.php?action=getMeal&meal=%@&house=%@&date=%@", meal, house, date];
    
    NSLog(@"loadMeal URL: %@", urlString);
	
	mealName = meal;
    
	NSString *dateStringURL =[urlString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
	
	NSURL *dataURL = [NSURL URLWithString:dateStringURL];
	
	urlString = nil;
    
	mealText = [NSString stringWithContentsOfURL:dataURL encoding:NSUTF8StringEncoding error:nil];
    if (mealText.length < 1) {
        mealText = @"N/A";
    }
    [self.mealArray addObject:mealText];
    [self.mealView reloadData];
}

#pragma mark Table view methods


// Customize the number of rows in the table view.
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (tableView == self.mealView) 
        return [mealArray count];
    else
        return [detailArray count];
}

- (UIView *) tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section 
{
    UIView *headerView = [[[UIView alloc] initWithFrame:CGRectMake(0, 0, tableView.bounds.size.width, 400)] autorelease];
	
	if (tableView == self.mealView) {
		if (section == 0)
			[headerView setBackgroundColor:[UIColor colorWithRed:1.0 green:0.8 blue:0.4 alpha:1.0]];
		else 
			[headerView setBackgroundColor:[UIColor clearColor]];
		
		UILabel *label = [[[UILabel alloc] initWithFrame:CGRectMake(10, 1, tableView.bounds.size.width - 16, 18)] autorelease];
		label.text = [NSString stringWithFormat:@"%@ - %@", houseName, mealName];
		label.textColor = [UIColor colorWithRed:0.4 green:0.4 blue:0.4 alpha:1.0];
		label.font = [UIFont fontWithName:@"Verdana-Bold" size:14];
		label.backgroundColor = [UIColor clearColor];
		label.adjustsFontSizeToFitWidth = YES;
		[headerView addSubview:label];
	} else {
		[headerView setBackgroundColor:[UIColor clearColor]];
	}
    
    return headerView;
}

// Customize the appearance of table view cells.
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {

	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"MyIdentifier"];
    
    if (tableView == self.mealView) {
        if (cell == nil) {
            cell = mealViewCell;
        }
        mealTextView.text = [mealArray objectAtIndex:indexPath.row];    
    }
    else {
        if (cell == nil) {
            cell = [[UITableViewCell alloc] init];
        }
		cell.textLabel.font = [UIFont fontWithName:@"Verdana-Bold" size:14];
		//cell.textLabel.highlightedTextColor = [UIColor colorWithRed:1.0 green:0.8 blue:0.4 alpha:1.0];
		cell.textLabel.text = [detailArray objectAtIndex:indexPath.row];
		cell.textLabel.lineBreakMode = UILineBreakModeWordWrap;
		cell.selectedBackgroundView = [[[UIImageView alloc] initWithImage:[UIImage imageNamed:@"blackBG.png"]] autorelease];
		//cell.selectionStyle = UITableViewCellSelectionStyleGray;
		
//		if (indexPath.row == 0) {
//			cell.highlighted = YES;
//		}
    }
    
	return cell;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    if (tableView == self.mealView) 
        return [mealArray count];
    else
        return 1;    
}

//- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
//    NSString *exactTitle = [NSString stringWithFormat:@"%@", houseName];
//    return exactTitle;
//}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {	
	self.houseName = [detailArray objectAtIndex:indexPath.row];
	[self.mealArray removeAllObjects];
	[self loadMeal:[mealSegment titleForSegmentAtIndex:[mealSegment selectedSegmentIndex]] forHouse:[detailArray objectAtIndex:indexPath.row] forDate:@"2011-02-28"];
	[self.mealView reloadData];
}

- (void)didReceiveMemoryWarning {
	// Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
	
	// Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
	// Release any retained subviews of the main view.
	// e.g. self.myOutlet = nil;
}


- (void)dealloc {
    [super dealloc];
}

@end
