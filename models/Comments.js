const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true
        },
        writtenBy: {
            type: String,
            require: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            require: true,
            trim: true
        },
        commentBody: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat
        },
        replies: [ReplySchema] 
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
