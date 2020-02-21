package router

import (
	"fmt"
	"strconv"

	jwt "../middleware"
	model "../models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

// Login struct
type Login struct {
	Account  string `form:"account" json:"account" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

// InitRouter init router
func InitRouter() *gin.Engine {
	router := gin.Default()

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowAllOrigins:  false,
		AllowOriginFunc:  func(origin string) bool { return true },
	}))

	api := router.Group("/api")
	api.Use(jwt.ValidateToken())
	{
		api.GET("/getUser", func(c *gin.Context) {
			userid, _ := strconv.Atoi(c.Query("userid"))
			fmt.Println(userid)
			if result, err := model.GetUser(userid); err != nil {
				c.JSON(200, gin.H{
					"data": "",
				})
			} else {
				c.JSON(200, gin.H{
					"data": result,
				})
			}
		})
		api.GET("/getProfile", func(c *gin.Context) {
			userid, _ := c.Get("userid")
			fmt.Println(userid)
			if result, err := model.GetUser(int(userid.(float64))); err != nil {
				c.JSON(200, gin.H{
					"data": "",
				})
			} else {
				c.JSON(200, gin.H{
					"data": result,
				})
			}
		})
		api.GET("/search", func(c *gin.Context) {
			if result, err := model.Search(c.Query("account")); err != nil {
				c.JSON(200, gin.H{
					"data": "",
				})
			} else {
				c.JSON(200, gin.H{
					"data": result,
				})
			}
		})

		api.GET("/getFollowers", func(c *gin.Context) {
			userid, _ := strconv.Atoi(c.Query("userid"))
			if result, err := model.GetFollowers(userid); err != nil {
				c.JSON(200, gin.H{
					"data": "",
				})
			} else {
				c.JSON(200, gin.H{
					"data": result,
				})
			}
		})

		api.GET("/getFollowings", func(c *gin.Context) {
			userid, _ := strconv.Atoi(c.Query("userid"))
			if result, err := model.GetFollowings(userid); err != nil {
				c.JSON(200, gin.H{
					"data": "",
				})
			} else {
				c.JSON(200, gin.H{
					"data": result,
				})
			}
		})

		api.POST("/follow", func(c *gin.Context) {
			var following model.Following
			c.BindJSON(&following)
			if err := model.Follow(&following); err != nil {
				c.AbortWithStatus(400)
			} else {
				c.AbortWithStatus(200)
			}
		})

		api.POST("/addPost", func(c *gin.Context) {
			var post model.Post
			c.BindJSON(&post)
			if err := model.AddPost(&post); err != nil {
				c.AbortWithStatus(400)
			} else {
				c.AbortWithStatus(200)
			}
		})

		api.GET("/getPosts", func(c *gin.Context) {
			account, _ := c.Get("account")
			fmt.Println(account)
			if result, err := model.GetPosts(account.(string)); err != nil {
				c.JSON(200, gin.H{
					"data": "",
				})
			} else {
				c.JSON(200, gin.H{
					"data": result,
				})
			}
		})

		// api.GET("/getFollowingsPosts", func(c *gin.Context) {
		// 	userid, _ := strconv.Atoi(c.Query("userid"))
		// 	if result, err := model.GetFollowingsPosts(userid); err != nil {
		// 		c.JSON(200, gin.H{
		// 			"data": "",
		// 		})
		// 	} else {
		// 		c.JSON(200, gin.H{
		// 			"data": result,
		// 		})
		// 	}
		// })
	}
	router.POST("/regist", func(c *gin.Context) {
		var user model.User
		c.BindJSON(&user)
		if err := model.Regist(&user); err != nil {
			c.AbortWithStatus(400)
		} else {
			c.AbortWithStatus(200)
		}
	})
	router.POST("/login", func(c *gin.Context) {
		var login Login
		c.BindJSON(&login)
		if result, err := model.Login(login.Account, login.Password); err != nil {
			c.JSON(200, gin.H{
				"message": "登入失敗",
				"result":  -1,
			})
		} else {
			token := jwt.GenerateToken(&result)
			c.SetCookie("token", token, 60*60, "/", "localhost", 4, false, true)
			c.JSON(200, gin.H{
				"message": "登入成功",
				"data":    result,
			})
		}
	})
	return router
}
