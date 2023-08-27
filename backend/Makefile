# =====================================================================================================================
# Include some helper functions
include ../.make/*

# =====================================================================================================================
# TARGETS

venv: .venv
.venv:
	@$(call INFO, Creating virtual environment...)
	@python3 -m venv .venv
	@source .venv/bin/activate
	@$(call SUCCESS, Virtual environment created at $$(realpath .venv))
	
	@$(call INFO, Installing requirements.txt...)
	@pip install -Ur requirements.txt
	@$(call SUCCESS, Virtual environment ready!)
	@$(call INFO, Run 'source .venv/bin/activate' to activate it.)

freeze:
	@if [ ! -v ${VIRTUAL_ENV} ]; then
		@pip freeze > requirements.txt
		@$(call SUCCESS, Successfully updated requirements.txt file!)

		@$(call INFO, Package list: )
		pip list
	@else
		@$(call WARNING, Make sure you've activated a virtual environment. Aborting...)
	@fi

clean:
	@$(call WARNING, Deleting files...)
	rm -rf .venv
	find -iname "*.pyc" -delete
	find -iname "__pycache__" -delete
	@$(call SUCCESS, Cleanup complete!)
