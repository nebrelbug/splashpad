iconsrc := logo/logo.png
icondir := icons
# iconsizes := {16,19,38,48,128,256}
# iconfiles := $(shell echo $(icondir)/icon-$(iconsizes).png)

$(icondir)/icon-%.png:
	@mkdir -p $(@D)
	convert $(iconsrc) -resize $* $@

# icons: $(iconfiles)

# .PHONY: icons