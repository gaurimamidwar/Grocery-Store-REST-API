# 🛒 Django Grocery Store REST API

A comprehensive RESTful API backend for a grocery store built with Django REST Framework, featuring role-based authentication, product management, and order processing capabilities.

## 📑 Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, Customer)
- Secure password handling
- Token refresh mechanism

### User Management
- User registration and authentication
- Profile management
- Role-based permissions
- Password reset functionality

### Product Management
- Category management
- Product inventory tracking
- Search and filtering capabilities
- Pagination support

### Order Processing
- Shopping cart functionality
- Order status tracking
- Order history
- Real-time inventory updates

### API Features
- RESTful architecture
- Comprehensive documentation
- Request validation
- Error handling
- Rate limiting

## 🛠 Technology Stack

- **Framework:** Django 5.1.3
- **API Framework:** Django REST Framework 3.14
- **Database:** PostgreSQL
- **Authentication:** Simple JWT
- **Documentation:** drf-yasg (Swagger/OpenAPI)
- **Testing:** Django Test Framework

## 🚀 Getting Started

### Prerequisites
```bash
Python 3.10+
PostgreSQL
Virtual Environment
```

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/grocery-store-api.git
cd grocery-store-api
```

2. **Set Up Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Environment Variables**
Create a `.env` file in the root directory:
```env
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/grocery_store_db
ALLOWED_HOSTS=localhost,127.0.0.1
```

5. **Database Setup**
```bash
# Create PostgreSQL database
createdb grocery_store_db

# Run migrations
python manage.py makemigrations
python manage.py migrate
```

6. **Create Superuser**
```bash
python manage.py createsuperuser
```

7. **Run Development Server**
```bash
python manage.py runserver
```

## 📚 API Documentation

### API Endpoints

#### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/token/` | Obtain JWT token | Public |
| POST | `/api/token/refresh/` | Refresh JWT token | Public |

#### User Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/` | Register new user | Public |
| GET | `/api/users/` | List all users | Admin |
| GET | `/api/users/me/` | Get current user profile | Authenticated |
| PUT | `/api/users/me/` | Update current user profile | Authenticated |
| DELETE | `/api/users/{id}/` | Delete user | Admin |

#### Category Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products/categories/` | List all categories | Authenticated |
| POST | `/api/products/categories/` | Create new category | Admin/Manager |
| GET | `/api/products/categories/{id}/` | Get category details | Authenticated |
| PUT | `/api/products/categories/{id}/` | Update category | Admin/Manager |
| DELETE | `/api/products/categories/{id}/` | Delete category | Admin/Manager |

#### Product Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products/` | List all products | Authenticated |
| POST | `/api/products/` | Create new product | Admin/Manager |
| GET | `/api/products/{id}/` | Get product details | Authenticated |
| PUT | `/api/products/{id}/` | Update product | Admin/Manager |
| DELETE | `/api/products/{id}/` | Delete product | Admin/Manager |
| GET | `/api/products/search/` | Search products | Authenticated |

#### Order Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/orders/` | List all orders | Admin/Manager |
| POST | `/api/orders/` | Create new order | Authenticated |
| GET | `/api/orders/{id}/` | Get order details | Admin/Manager/Owner |
| PUT | `/api/orders/{id}/status/` | Update order status | Admin/Manager |
| GET | `/api/orders/my-orders/` | List user's orders | Authenticated |

### API Usage Examples

#### Authentication
```bash
# Login
POST /api/token/
Content-Type: application/json

{
    "username": "user@example.com",
    "password": "your_password"
}

# Response
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### Creating a Product
```bash
POST /api/products/
Authorization: Bearer your_access_token
Content-Type: application/json

{
    "name": "Fresh Apples",
    "category": 1,
    "price": "2.99",
    "quantity": 100,
    "description": "Fresh red apples from local farms"
}

# Response
{
    "id": 1,
    "name": "Fresh Apples",
    "category": 1,
    "price": "2.99",
    "quantity": 100,
    "description": "Fresh red apples from local farms",
    "created_at": "2024-11-17T10:00:00Z"
}
```

#### Placing an Order
```bash
POST /api/orders/
Authorization: Bearer your_access_token
Content-Type: application/json

{
    "shipping_address": "123 Main St, City, Country",
    "items": [
        {
            "product": 1,
            "quantity": 5
        }
    ]
}

# Response
{
    "id": 1,
    "items": [
        {
            "product": 1,
            "quantity": 5,
            "price": "2.99"
        }
    ],
    "total_amount": "14.95",
    "status": "pending",
    "shipping_address": "123 Main St, City, Country",
    "created_at": "2024-11-17T10:05:00Z"
}
```

### Response Codes
| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 📁 Project Structure
```
grocery_store/               # Root project directory
│
├── venv/                   # Virtual environment directory
│
├── manage.py
│
├── grocery_store/          # Project configuration directory
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── apps/                   # Apps directory
│   ├── __init__.py
│   │
│   ├── users/             # Users app
│   │   ├── __init__.py
│   │   ├── apps.py       # Add this file
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── permissions.py
│   │   └── migrations/
│   │       └── __init__.py
│   │
│   ├── products/          # Products app
│   │   ├── __init__.py
│   │   ├── apps.py       # Add this file
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │   └── migrations/
│   │       └── __init__.py
│   │
│   └── orders/           # Orders app
│       ├── __init__.py
│       ├── apps.py      # Add this file
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       └── urls.py
│       └── migrations/
│           └── __init__.py
│
└── requirements.txt
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
python manage.py test

# Run specific test file
python manage.py test apps.products.tests

# Run with coverage
coverage run manage.py test
coverage report
```

### Test Categories
- Unit Tests
- Integration Tests
- API Tests
- Permission Tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

Your Name - [GitHub](https://github.com/KPVISHNUSAI)

## 🙏 Acknowledgments

- Django Documentation
- Django REST Framework Documentation
- PostgreSQL Documentation

## 📞 Contact


Project Link: [https://github.com/KPVISHNUSAI/grocery-store-api](https://github.com/KPVISHNUSAI/grocery-store-api)

---

⭐️ Star this repo if you find it helpful!