import random
import click

@click.group()
def cli():
    pass


@cli.command()
def init():
    """Add fake data"""

    from bytardag.models import Sheet, Row
    from bytardag.database import SessionLocal

    with SessionLocal() as session:

        name_offset = random.randint(10, 100)

        SELLER_IDS = ['A-01', 'A-03', 'C-03', 'C-05', 'F-03', 'P-07', 'S-01', 'S-03', 'X-01', 'X-03']
        AMOUNTS = [5, 10, 20, 25, 50, 75, 100]

        for i in range(10):
            rows = [Row(seller=random.choice(SELLER_IDS), amount=random.choice(AMOUNTS)) for _ in range(random.randint(3, 10))]
            sheet = Sheet(name=f'{name_offset+i}', rows=rows)

            session.add(sheet)

        session.commit()
        click.echo('Added new sheets with fake data.')
