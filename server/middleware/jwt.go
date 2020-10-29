package middleware

import (
	"fmt"

	models "github.com/a22773889g/CommunityWeb/server/models"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

//GenerateToken generate token
func GenerateToken(user *models.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userid":  user.UserID,
		"account": user.Account,
		"name":    user.UserName,
	})

	tokenString, err := token.SignedString([]byte("my_secret_key"))

	fmt.Println(tokenString, err)
	return tokenString
}

//ValidateToken validate token
func ValidateToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Request.Cookie("token")
		if err != nil {
			c.JSON(200, gin.H{
				"status": 401,
				"msg":    "token錯誤",
			})
			c.Abort()
			return
		}
		token, err := jwt.Parse(tokenString.Value, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			return []byte("my_secret_key"), nil
		})

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("account", claims["account"])
			c.Set("userid", claims["userid"])
		} else {
			fmt.Println(err)
			c.JSON(200, gin.H{
				"status": 401,
				"msg":    "token錯誤",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
