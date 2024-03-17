(function ($) {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)",
    xxsmall: "(max-width: 360px)",
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax = function (intensity) {
    var $window = $(window),
      $this = $(this);

    if (this.length == 0 || intensity === 0) return $this;

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) $(this[i])._parallax(intensity);

      return $this;
    }

    if (!intensity) intensity = 0.25;

    $this.each(function () {
      var $t = $(this),
        $bg = $('<div class="bg"></div>').appendTo($t),
        on,
        off;

      on = function () {
        $bg.removeClass("fixed").css("transform", "none");

        $window.on("scroll._parallax", function () {
          $bg.css("transform", "none");
        });
      };

      off = function () {
        $bg.addClass("fixed").css("transform", "none");

        $window.off("scroll._parallax");
      };

      // Disable parallax on ..
      if (
        skel.vars.browser == "ie" || // IE
        skel.vars.browser == "edge" || // Edge
        window.devicePixelRatio > 1 || // Retina/HiDPI (= poor performance)
        skel.vars.mobile
      )
        // Mobile devices
        off();
      // Enable everywhere else.
      else {
        skel.on("!large -large", on);
        skel.on("+large", off);
      }
    });

    $window
      .off("load._parallax resize._parallax")
      .on("load._parallax resize._parallax", function () {
        $window.trigger("scroll");
      });

    return $(this);
  };

  $(function () {
    var $window = $(window),
      $body = $("body"),
      $wrapper = $("#wrapper"),
      $header = $("#header"),
      $nav = $("#nav"),
      $main = $("#main"),
      $navPanelToggle,
      $navPanel,
      $navPanelInner;

    // Disable animations/transitions until the page has loaded.
    $window.on("load", function () {
      window.setTimeout(function () {
        $body.removeClass("is-loading");
      }, 100);
    });

    // Prioritize "important" elements on medium.
    skel.on("+medium -medium", function () {
      $.prioritize(
        ".important\\28 medium\\29",
        skel.breakpoint("medium").active
      );
    });

    // Scrolly.
    $(".scrolly").scrolly();

    // Background.
    $wrapper._parallax(0.925);

    // Nav Panel.

    // Toggle.
    $navPanelToggle = $(
      '<a href="#navPanel" id="navPanelToggle">Menu</a>'
    ).appendTo($wrapper);

    // Change toggle styling once we've scrolled past the header.
    $header.scrollex({
      bottom: "5vh",
      enter: function () {
        $navPanelToggle.removeClass("alt");
      },
      leave: function () {
        $navPanelToggle.addClass("alt");
      },
    });

    // Panel.
    $navPanel = $(
      '<div id="navPanel">' +
        "<nav>" +
        "</nav>" +
        '<a href="#navPanel" class="close"></a>' +
        "</div>"
    )
      .appendTo($body)
      .panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: "right",
        target: $body,
        visibleClass: "is-navPanel-visible",
      });

    // Get inner.
    $navPanelInner = $navPanel.children("nav");

    // Move nav content on breakpoint change.
    var $navContent = $nav.children();

    skel.on("!medium -medium", function () {
      // NavPanel -> Nav.
      $navContent.appendTo($nav);

      // Flip icon classes.
      $nav.find(".icons, .icon").removeClass("alt");
    });

    skel.on("+medium", function () {
      // Nav -> NavPanel.
      $navContent.appendTo($navPanelInner);

      // Flip icon classes.
      $navPanelInner.find(".icons, .icon").addClass("alt");
    });

    // Hack: Disable transitions on WP.
    if (skel.vars.os == "wp" && skel.vars.osVersion < 10)
      $navPanel.css("transition", "none");

    // Intro.
    var $intro = $("#intro");

    if ($intro.length > 0) {
      // Hack: Fix flex min-height on IE.
      if (skel.vars.browser == "ie") {
        $window
          .on("resize.ie-intro-fix", function () {
            var h = $intro.height();

            if (h > $window.height()) $intro.css("height", "auto");
            else $intro.css("height", h);
          })
          .trigger("resize.ie-intro-fix");
      }

      // Hide intro on scroll (> small).
      skel.on("!small -small", function () {
        $main.unscrollex();

        $main.scrollex({
          mode: "bottom",
          top: "25vh",
          bottom: "-50vh",
          enter: function () {
            $intro.addClass("hidden");
          },
          leave: function () {
            $intro.removeClass("hidden");
          },
        });
      });

      // Hide intro on scroll (<= small).
      skel.on("+small", function () {
        $main.unscrollex();

        $main.scrollex({
          mode: "middle",
          top: "15vh",
          bottom: "-15vh",
          enter: function () {
            $intro.addClass("hidden");
          },
          leave: function () {
            $intro.removeClass("hidden");
          },
        });
      });
    }

    //me.jpg floating image effect
    const multiple = 10;
    const mouseOverContainer = document.getElementById("mouseOverContainer");
    const element = document.getElementsByClassName("floating_img")[0];

    function transformElement(x, y) {
      var box = element.getBoundingClientRect();
      const calcX = -(y - box.y - box.height / 2) / multiple;
      const calcY = (x - box.x - box.width / 2) / multiple;
      const percentage = parseInt(((x - box.x) / box.width) * 1000) / 10;

      element.style.transform =
        "rotateX(" + calcX + "deg) " + "rotateY(" + calcY + "deg)";
    }

    mouseOverContainer.addEventListener("mousemove", (e) => {
      window.requestAnimationFrame(function () {
        transformElement(e.clientX, e.clientY);
      });
    });

    mouseOverContainer.addEventListener("mouseleave", (e) => {
      window.requestAnimationFrame(function () {
        element.style.transform = "rotateX(0) rotateY(0)";
      });
    });

    var myDate = new Date();
	var year = myDate.getFullYear();
    var mon = myDate.getMonth() + 1;
    var date = myDate.getDate();
	var age_y = year - 2005;
	var age_w = year - 2004;
	var y_anni = year - 2023;
  var days = {
			"1.1": ["今天是元旦节，也是小叶的生日！", `快去为她送上祝福吧！${age_y}岁生日快乐，小叶！`,"icon fa-birthday-cake"],
			"2.14": ["情人节快乐!","愿天下有情人终成眷属","icon fa-heart"],
			"5.20": ["520","","icon fa-heart"],
			"5.21": ["521","","icon fa-heart"],
			"6.9": ["周年纪念日",`小叶和小汪在一起已经${y_anni}年了！`,"icon fa-birthday-cake"],
			"9.21": ["今天是小汪的生日！", `快去为他送上祝福吧！${age_w}岁生日快乐，小汪！`,"icon fa-birthday-cake"],
			"10.1": ["今天是国庆节","祝愿我们的国家繁荣昌盛，国庆快乐！","icon fa-flag"],
			"12.25": ["圣诞节快乐","愿我们大家的圣诞节充满温暖和欢乐，圣诞快乐！","icon fa-gift"]
	}; // 自定义纪念日
    for (key in days) {
      var d = key.split(".");
      if (mon == d[0] && date == d[1]) {
        iziToast.info({
          timeout: 14000,
          closeOnEscape: "true",
          transitionOut: "fadeOutUp",
          layout: "2",
          transitionIn: "bounceInDown",
          position: "topCenter",
          icon: (days[key][2]=="")?"icon fa-calendar":days[key][2],
          backgroundColor: "#ffffff",
          title: days[key][0],
          message:days[key][1],
        });

      }
    }

    document.body.oncopy = function () {
      iziToast.info({
        timeout: 4000, // 关闭弹窗的时间
        closeOnEscape: "true", // 允许使用Esc键关闭弹窗
        transitionIn: "bounceInLeft", // 弹窗打开动画
        transitionOut: "fadeOutRight", // 弹窗关闭动画
        displayMode: "replace", // 替换已经打开的弹窗
        layout: "2", // Medium模式
        position: "topRight", // 弹窗位置
        icon: "icon fa-copy", // 图标类名
        backgroundColor: "#fff", // 弹窗背景色
        title: "复制成功", // 通知标题
        message: "请遵守 CC BY-NC-SA 4.0 协议", // 通知消息内容
      });
    };
  });
})(jQuery);
//NCFXQXMWOUNOCLJD