package router

import (
	"fmt"

	model "../models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/sessions"
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
	store := sessions.NewCookieStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))

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
	{
		api.GET("/getUser", func(c *gin.Context) {
			session := sessions.Default(c)
			if account := session.Get("account"); account == nil {
				c.JSON(200, gin.H{
					"message": "請先登入",
					"result":  -1,
				})
			} else {
				if result, err := model.Search(account.(string)); err != nil {
					c.AbortWithStatus(400)
				} else {
					c.JSON(200, result)
				}
			}
		})

		api.POST("/regist", func(c *gin.Context) {
			var user model.User
			c.BindJSON(&user)
			if err := model.Regist(&user); err != nil {
				c.AbortWithStatus(400)
			} else {
				c.AbortWithStatus(200)
			}
		})

		api.POST("/login", func(c *gin.Context) {
			var login Login
			c.BindJSON(&login)
			if result, err := model.Login(login.Account, login.Password); err != nil {
				c.JSON(200, gin.H{
					"message": "登入失敗",
					"result":  -1,
				})
			} else {
				session := sessions.Default(c)
				session.Set("account", result.Account)
				session.Set("userid", result.UserID)
				session.Save()
				c.JSON(200, gin.H{
					"message": "登入成功",
					"data":    result,
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
			session := sessions.Default(c)
			fmt.Println(session.Get("userid").(int))
			if result, err := model.GetFollowers(session.Get("userid").(int)); err != nil {
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
			session := sessions.Default(c)
			fmt.Println(session.Get("userid").(int))
			if result, err := model.GetFollowings(session.Get("userid").(int)); err != nil {
				c.JSON(200, gin.H{
					"data": "",
				})
			} else {
				c.JSON(200, gin.H{
					"data": result,
				})
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
	}

	return router
}
