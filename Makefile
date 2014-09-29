
all:
	@make npm
	@make test

npm:
	@npm install

test:
	@( gulp test )

watch:
	@( gulp )

docs:
	@( gulp jsdoc )

version:
	@( cd app ; node app --version )

run:
	@( node app/app.js --env development --configfile `pwd`/app-config.json )

.PHONY:	unit
.PHONY:	npm
.PHONY:	watch
.PHONY:	test
.PHONY:	docs
.PHONY:	run
.PHONY:	version
