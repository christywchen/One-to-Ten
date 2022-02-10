"""added active to Users

Revision ID: 62a6f41fce0e
Revises:
Create Date: 2022-02-09 09:29:31.311952

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '62a6f41fce0e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('surveys',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('dob', sa.Date(), nullable=True),
    sa.Column('biography', sa.String(), nullable=True),
    sa.Column('facebook', sa.String(), nullable=True),
    sa.Column('instagram', sa.String(), nullable=True),
    sa.Column('snapchat', sa.String(), nullable=True),
    sa.Column('tiktok', sa.String(), nullable=True),
    sa.Column('twitter', sa.String(), nullable=True),
    sa.Column('github', sa.String(), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('compatibility_score', sa.Numeric(), nullable=False),
    sa.Column('user_1_id', sa.Integer(), nullable=False),
    sa.Column('user_2_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_1_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_2_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('questions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('weight', sa.Numeric(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.Column('one_label', sa.String(), nullable=False),
    sa.Column('ten_label', sa.String(), nullable=False),
    sa.Column('survey_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['survey_id'], ['surveys.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('text')
    )
    op.create_table('survey_responses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('survey_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['survey_id'], ['surveys.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('question_responses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('response', sa.Numeric(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('question_stats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('response_count', sa.Integer(), nullable=False),
    sa.Column('average', sa.Numeric(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('question_stats')
    op.drop_table('question_responses')
    op.drop_table('survey_responses')
    op.drop_table('questions')
    op.drop_table('matches')
    op.drop_table('users')
    op.drop_table('surveys')
    # ### end Alembic commands ###
