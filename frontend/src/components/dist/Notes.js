"use strict";
exports.__esModule = true;
var Note_module_css_1 = require("../styles/Note.module.css");
var utils_module_css_1 = require("../styles/utils.module.css");
var react_bootstrap_1 = require("react-bootstrap");
var formateDate_1 = require("../utils/formateDate");
var md_1 = require("react-icons/md");
var ci_1 = require("react-icons/ci");
var react_1 = require("react");
//individual note card in frontend display
var Note = function (_a) {
    var note = _a.note, className = _a.className, onNoteClicked = _a.onNoteClicked, onDeleteNoteClicked = _a.onDeleteNoteClicked;
    //unpack note property
    var title = note.title, text = note.text, createdAt = note.createdAt, updatedAt = note.updatedAt;
    var createdUpdatedText;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formateDate_1.formatDate(updatedAt);
    }
    else {
        createdUpdatedText = "Created: " + formateDate_1.formatDate(createdAt);
    }
    var _b = react_1.useState(false), isCardChecked = _b[0], setIsCardChecked = _b[1];
    var cardChecked = function () {
        setIsCardChecked(!isCardChecked);
    };
    return (React.createElement(react_bootstrap_1.Card, { className: (isCardChecked ? Note_module_css_1["default"].cardChecked : Note_module_css_1["default"].noteCard) + " " + className, onClick: function () { onNoteClicked(note); } },
        React.createElement(react_bootstrap_1.Card.Body, { className: Note_module_css_1["default"].cardBody },
            React.createElement(react_bootstrap_1.Card.Title, { className: utils_module_css_1["default"].flexCenter },
                React.createElement(ci_1.CiCircleCheck, { className: "text-muted", onClick: function (e) {
                        cardChecked();
                        e.stopPropagation();
                    } }),
                title,
                React.createElement(md_1.MdDelete, { className: "text-muted ms-auto", onClick: function (e) {
                        onDeleteNoteClicked(note);
                        e.stopPropagation();
                    } })),
            React.createElement(react_bootstrap_1.Card.Text, { className: Note_module_css_1["default"].cardText }, text)),
        React.createElement(react_bootstrap_1.Card.Footer, { className: "text-muted" }, createdUpdatedText)));
};
exports["default"] = Note;
