
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
	@( grunt jsdoc )

version:
	@( cd app ; node app --version )

.PHONY:	unit
.PHONY:	npm
.PHONY:	watch
.PHONY:	test
.PHONY:	docs
.PHONY:	version
