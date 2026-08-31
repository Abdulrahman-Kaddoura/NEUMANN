"""add photo url to employees

Revision ID: 060ba59fd62f
Revises: ed93234e9d2b
Create Date: 2026-08-31 21:25:29.026674

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '060ba59fd62f'
down_revision: Union[str, Sequence[str], None] = 'ed93234e9d2b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('employees', sa.Column('photo_url', sa.String(length=255), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('employees', 'photo_url')
