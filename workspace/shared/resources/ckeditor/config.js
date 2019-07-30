/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.toolbarGroups = [
        { name: 'items', groups: ['spellchecker', 'clipboard','document'] },
		{ name: 'clipboard', groups: ['undo'] },
		{ name: 'editing', groups: ['find', 'selection'] },
		{ name: 'basicstyles', groups: ['cleanup', 'basicstyles'] },
		{ name: 'links' },
        { name: 'paragraph', groups: ['list', 'align', 'indent'] },
		{ name: 'colors' },     
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'tools' }
    ];

    // The default plugins included in the basic setup define some buttons that
    // are not needed in a basic editor. They are removed here.
    //config.removeButtons = 'Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript,about';
    config.removeButtons = 'Anchor,Save,NewPage,Preview,Replace,CopyFormatting,Subscript,Superscript,Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,ShowBlocks';

    // Dialog windows are also simplified.
    config.removeDialogTabs = 'link:advanced';
    config.filebrowserUploadUrl = 'uploader/upload.html';

};
