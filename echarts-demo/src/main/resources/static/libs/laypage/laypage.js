/*!

 @Name : layPage v1.3- 分页插件
 @Author: 贤心
 @Site：http://sentsin.com/layui/laypage
 @License：MIT

 */

;!function () {
    "use strict";

    function laypage(options) {
        var skin = 'laypagecss';
        laypage.dir = 'dir' in laypage ? laypage.dir : Page.getpath + 'skin/laypage.css';
        new Page(options);
        if (laypage.dir && !doc[id](skin)) {
            Page.use(laypage.dir, skin);
        }
    }

    laypage.v = '1.3';

    var doc = document, id = 'getElementById', tag = 'getElementsByTagName';
    var index = 0, Page = function (options) {
        var that = this;
        var conf = that.config = options || {};
        conf.item = index++;
        that.render(true);
    };

    Page.on = function (elem, even, fn) {
        elem.attachEvent ? elem.attachEvent('on' + even, function () {
            fn.call(elem, window.even); //for ie, this指向为当前dom元素
        }) : elem.addEventListener(even, fn, false);
        return Page;
    };

    Page.getpath = (function () {
        var js = document.scripts, jsPath = js[js.length - 1].src;
        return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }())

    Page.use = function (lib, id) {
        var link = doc.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = laypage.dir;
        id && (link.id = id);
        doc[tag]('head')[0].appendChild(link);
        link = null;
    };

//判断传入的容器类型
    Page.prototype.type = function () {
        var conf = this.config;
        if (typeof conf.cont === 'object') {
            return conf.cont.length === undefined ? 2 : 3;
        }
    };

//分页视图
    Page.prototype.view = function () {
        var that = this, conf = that.config, view = [], dict = {};
        conf.pages = conf.pages | 0;
        conf.curr = (conf.curr | 0) || 1;
        conf.groups = 'groups' in conf ? (conf.groups | 0) : 5;
        conf.first = 'first' in conf ? conf.first : '&#x9996;&#x9875;';
        conf.last = 'last' in conf ? conf.last : '&#x5C3E;&#x9875;';
        conf.prev = 'prev' in conf ? conf.prev : '&#x4E0A;&#x4E00;&#x9875;';
        conf.next = 'next' in conf ? conf.next : '&#x4E0B;&#x4E00;&#x9875;';

        if (conf.pages <= 1) {
            return '';
        }

        if (conf.groups > conf.pages) {
            conf.groups = conf.pages;
        }

        //计算当前组
        dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0)) / (conf.groups === 0 ? 1 : conf.groups));

        //当前页非首页，则输出上一页
        if (conf.curr > 1 && conf.prev) {
            view.push('<a href="javascript:;" class="laypage_prev" data-page="' + (conf.curr - 1) + '">' + conf.prev + '</a>');
        }

        //当前组非首组，则输出首页
        if (dict.index > 1 && conf.first && conf.groups !== 0) {
            view.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">' + conf.first + '</a><span>&#x2026;</span>');
        }

        //输出当前页组
        dict.poor = Math.floor((conf.groups - 1) / 2);
        dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
        dict.end = dict.index > 1 ? (function () {
            var max = conf.curr + (conf.groups - dict.poor - 1);
            return max > conf.pages ? conf.pages : max;
        }()) : conf.groups;
        if (dict.end - dict.start < conf.groups - 1) { //最后一组状态
            dict.start = dict.end - conf.groups + 1;
        }
        for (; dict.start <= dict.end; dict.start++) {
            if (dict.start === conf.curr) {
                view.push('<span class="laypage_curr" ' + (/^#/.test(conf.skin) ? 'style="background-color:' + conf.skin + '"' : '') + '>' + dict.start + '</span>');
            } else {
                view.push('<a href="javascript:;" data-page="' + dict.start + '">' + dict.start + '</a>');
            }
        }

        //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
        if (conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0) {
            view.push('<span>&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="' + conf.pages + '">' + conf.last + '</a>');
        }

        //当前页不为尾页时，输出下一页
        dict.flow = !conf.prev && conf.groups === 0;
        if (conf.curr !== conf.pages && conf.next || dict.flow) {
            view.push((function () {
                return (dict.flow && conf.curr === conf.pages)
                    ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + conf.next + '</span>'
                    : '<a href="javascript:;" class="laypage_next" data-page="' + (conf.curr + 1) + '">' + conf.next + '</a>';
            }()));
        }

        return '<div name="laypage' + laypage.v + '" class="laypage_main laypageskin_' + (conf.skin ? (function (skin) {
                return /^#/.test(skin) ? 'molv' : skin;
            }(conf.skin)) : 'default') + '" id="laypage_' + that.config.item + '">' + view.join('') + function () {
                return conf.skip
                    ? '<span class="laypage_total"><label>&#x5230;&#x7B2C;</label><input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label>'
                + '<button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>'
                    : '';
            }()
            + function () {
                return conf.changePageSize ?
                '<span class="laypage_total" style="width:120px">'
                + '<label>每页</label>'
                + '<select id="ddlPageSize" name="pageSize" style="height: 24px;line-height: 24px;width: 40px;margin: 0 5px;">'
                + (conf.pageSize == 10 ? '<option value="10" selected="selected">10</option>' : '<option value="10">10</option>')
                + (conf.pageSize == 20 ? '<option value="20" selected="selected">20</option>' : '<option value="20">20</option>')
                + (conf.pageSize == 30 ? '<option value="30" selected="selected">30</option>' : '<option value="30">30</option>')
                + (conf.pageSize == 40 ? '<option value="40" selected="selected">40</option>' : '<option value="40">40</option>')
                + (conf.pageSize == 50 ? '<option value="50" selected="selected">50</option>' : '<option value="50">50</option>')
                + '</select><label>条</label></span>'
                    : '';
            }()
            + '</div>'
            ;
    };

//增加每页显示条数控制的支持
    Page.prototype.changePageSize = function () {
        var that = this, conf = that.config;
        var elem = doc[id]('laypage_' + conf.item);
        if(elem){
            var selectObj = elem[tag]('select')[0];
        }
        if (selectObj) {
            Page.on(selectObj, 'change', function () {
                var index = selectObj.selectedIndex;
                conf.pageSize = selectObj.options[index].value;
                conf.curr = 1; //修改每页显示条数时，重设定当前页码为1
                that.render();
            });
        }
    }

//跳页
    Page.prototype.jump = function (elem) {
        if (!elem) return;
        var that = this, conf = that.config, childs = elem.children;
        var btn = elem[tag]('button')[0];
        var input = elem[tag]('input')[0];
        for (var i = 0, len = childs.length; i < len; i++) {
            if (childs[i].nodeName.toLowerCase() === 'a') {
                Page.on(childs[i], 'click', function () {
                    var curr = this.getAttribute('data-page') | 0;
                    conf.curr = curr;
                    that.render();

                });
            }
        }
        if (btn) {
            Page.on(btn, 'click', function () {
                var curr = input.value.replace(/\s|\D/g, '') | 0;
                if (curr && curr <= conf.pages) {
                    conf.curr = curr;
                    that.render();
                }
            });
        }
    };

//渲染分页
    Page.prototype.render = function (load) {
        var that = this, conf = that.config, type = that.type();
        var view = that.view();
        if (type === 2) {
            conf.cont.innerHTML = view;
        } else if (type === 3) {
            conf.cont.html(view);
        } else {
            doc[id](conf.cont).innerHTML = view;
        }
        conf.jump && conf.jump(conf, load);
        that.jump(doc[id]('laypage_' + conf.item));
        //deploy.changePageSize && deploy.changePageSize(deploy, load);
        that.changePageSize(doc[id]('laypage_' + conf.item));
        if (conf.hash && !load) {
            location.hash = '!' + conf.hash + '=' + conf.curr;
        }
    };

//for 页面模块加载、Node.js运用、页面普通应用
    "function" === typeof define ? define(function () {
        return laypage;
    }) : "undefined" != typeof exports ? module.exports = laypage : window.laypage = laypage;

}();

function loadPageData(divId, url, pages, params,bigData,isFirst) {
    if (!pages) {
        return;
    }
    if (isFirst != undefined && !isFirst){
        params["pageNum"] = params["pageNum"] || 1;
    }else{
        params["pageNum"] = 1;
    }
    params["pageSize"] = params["pageSize"] || 20;
    $.ajax({
        type: "post",
        url: url,
        data: $.extend(true,{},params,{ajax:true}),
        success: function (data) {
            var html = $("<div></div>").append($.parseHTML(data));
            var totalPages = $("#totalPages", html);
            var pageCount = $("#pageCount", html);
            var totalPages=$("#totalPages",html);
            var _pages = Number(totalPages.val()) || pages;
            var _pageCount = Number(pageCount.val()) || 0;
            totalPages.remove();
            pageCount.remove();
            $("#" + divId).html(html.html());
            /* hidemodal();*/

            var op={
                cont: divId + '-page',
                changePageSize: true,
                pages: _pages,
                skip:true,
                bigData:bigData||true,
                pageSize: params["pageSize"],
                curr: params["pageNum"],
                jump: function (obj, first) {
                    if (!first) {
                        params["pageNum"] = obj.curr;
                        params["pageSize"] = obj.pageSize;

                        loadPageData(divId, url, _pages, params,bigData,false);
                    }
                },
                changePageSize: function (obj, first) {
                    if (!first) {
                        params["pageNum"] = obj.curr;
                        params["pageSize"] = obj.pageSize;
                        loadPageData(divId, url, _pages, params,bigData,false);
                    }
                }
            }
            if(Number(params["pageNum"])>1&&_pageCount<Number(params["pageSize"])){
                op.pages=Number(params["pageNum"]);
            }
            if (!op.bigData&&Number(params["pageNum"])===1&&_pageCount <Number(params["pageSize"])){
                return;
            }

            //调用分页
            laypage(op);
            /* scrollbar&&scrollbar();*/

        }
    });
}

function loadPage(url,cur,pageSize,pages,divId,curForm) {
    var op={
        cont: divId,
        changePageSize: true,
        pages: pages,
        skip:true,
        pageSize: pageSize,
        // curr: params["pageNum"],
        curr:cur,
        jump: function (obj, first) {
            if (!first) {
                if(curForm != null && curForm != undefined){
                    var form = document.forms[curForm];
                    form.action = url;
                    form.elements["pageNum"].value = obj.curr;
                    form.elements["pageSize"].value = obj.pageSize;
                    form.submit();
                }else {
                    location.href = url + "pageNum="+obj.curr+"&pageSize="+obj.pageSize;
                }
            }
        }
    }
    //调用分页
    laypage(op);
}