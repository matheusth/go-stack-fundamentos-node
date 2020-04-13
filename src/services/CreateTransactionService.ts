import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransaction): Transaction {
    const totalBalance = this.transactionsRepository.getBalance().total;
    if (totalBalance < value && type === 'outcome') {
      throw Error("Can't outcome a value bigger than the total avaible");
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
