module.exports = {
	"extends": "google",
	"rules": {
		"max-len": ["error", 150],
		"indent": ["error", 2],
		"new-cap": ["error", { 
			"capIsNewExceptions": ["Router","Schema"],
		}],
  },
	"parserOptions": {
		"ecmaVersion": 6,
	}
};