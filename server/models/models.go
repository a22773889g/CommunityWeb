package models

import (
	"fmt"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql" //driver
)

//User Schema
type User struct {
	UserID       int    `json:"userid" gorm:"primary_key"`
	Account      string `json:"account"`
	Password     string `json:"password"`
	UserName     string `json:"name"`
	Avatar       string `json:"avatar"`
	Introduction string `json:"introduction"`
}

//Comment Schema
type Comment struct {
	CommentID int    `json:"commentid" gorm:"primary_key"`
	Account   string `json:"account"`
	Avatar    string `json:"avatar"`
	Content   string `json:"content" sql:"type:text"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

//Post Schema
type Post struct {
	PostID    int    `json:"postid" gorm:"primary_key"`
	UserID    int    `json:"userid"`
	Account   string `json:"account"`
	Author    string `json:"author"`
	Avatar    string `json:"avatar"`
	Content   string `json:"content"`
	Like      int    `json:"like"`
	Image     string `json:"image"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

//Follower Schema
type Follower struct {
	ID         int `json:"id" gorm:"primary_key"`
	UserID     int `json:"userid"`
	FollowerID int `json:"followerid"`
}

//Following Schema
type Following struct {
	ID          int `json:"id" gorm:"primary_key"`
	UserID      int `json:"userid"`
	FollowingID int `json:"followingid"`
}

//Db Gorm
var Db *gorm.DB

func init() {
	var err error
	Db, err = gorm.Open("mysql", "s1104137246:3015@(107.167.178.60)/s1104137246?charset=utf8&parseTime=True&loc=Local")

	if err != nil {
		fmt.Printf("mysql connect error %v", err)
	}

	if Db.Error != nil {
		fmt.Printf("database error %v", Db.Error)
	}
	Db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8").AutoMigrate(&User{}, &Post{}, &Comment{}, &Follower{}, &Following{})

}

//Login check account and return user's information
func Login(account string, password string) (userInfo User, err error) {
	if err = Db.Where(&User{Account: account, Password: password}).First(&userInfo).Error; err != nil {
		fmt.Println(err)
	}
	return
}

// Regist regist member
func Regist(user *User) (err error) {
	if err = Db.Create(user).Error; err != nil {
		fmt.Println(err)
	}
	return
}

// GetUser get user's information
func GetUser(userid int) (userInfo User, err error) {
	if err = Db.Select("user_id, account, user_name, avatar, introduction").Where("user_id = ?", userid).Find(&userInfo).Error; err != nil {
		fmt.Println(err)
	}
	return
}

// Search search user's information
func Search(account string) (userInfo []User, err error) {
	if err = Db.Select("user_id,account, user_name, avatar, introduction").Where("account LIKE ?", "%"+account+"%").Find(&userInfo).Error; err != nil {
		fmt.Println(err)
	}
	return
}

// GetFollowers get follower's information
func GetFollowers(userid int) (userInfo []User, err error) {
	var follower []Follower
	if err = Db.Select("follower_id").Joins("join users on users.user_id = followers.user_id").Where("users.user_id = ?", userid).Find(&follower).Error; err != nil {
		fmt.Println(err)
	}
	for _, val := range follower {
		var user User
		fmt.Println(val.FollowerID)
		if err = Db.Select("account, user_name, avatar, introduction").Where("user_id = ?", val.FollowerID).Find(&user).Error; err != nil {
			fmt.Println(err)
		}
		userInfo = append(userInfo, user)
	}
	return
}

// GetFollowings get follower's information
func GetFollowings(userid int) (userInfo []User, err error) {
	var following []Following
	if err = Db.Select("following_id").Joins("join users on users.user_id = followings.user_id").Where("users.user_id = ?", userid).Find(&following).Error; err != nil {
		fmt.Println(err)
	}
	for _, val := range following {
		var user User
		fmt.Println(val.FollowingID)
		if err = Db.Select("account, user_name, avatar, introduction").Where("user_id = ?", val.FollowingID).Find(&user).Error; err != nil {
			fmt.Println(err)
		}
		userInfo = append(userInfo, user)
	}
	return
}

//Follow Follow someone
func Follow(following *Following) (err error) {
	if err = Db.Create(following).Error; err != nil {
		fmt.Println(err)
	}
	follower := Follower{UserID: following.FollowingID, FollowerID: following.UserID}
	if err = Db.Create(&follower).Error; err != nil {
		fmt.Println(err)
	}
	return
}

// AddPost add post
func AddPost(post *Post) (err error) {
	if err = Db.Create(post).Error; err != nil {
		fmt.Println(err)
	}
	return
}

// GetPosts get posts
func GetPosts(account string) (posts []Post, err error) {
	if err = Db.Where(&Post{Account: account}).Find(&posts).Error; err != nil {
		fmt.Println(err)
	}
	return
}

// func GetFollowingsPosts(userid int)(posts []Post,err error){
// 	if followings, err := GetFollowings(userid); err!=nil{
// 		fmt.Println(err)
// 	}else{
// 		for _,val range followings{

// 		}
// 	}
// 	return
// }
